import { join } from "node:path";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import {
    envExampleFileLocation,
    envFileLocation,
    prodEnvFileLocation,
    webServerList,
} from "../config";
import { appendExistsFile, copy, formatEnvFiles, generateFile } from "../utils";
import { validateTemplate } from "./validators";
import type { Config, GenerateFileArgs } from "../types";
import { showCompletionMessage } from "../cli/display";

export async function setupWebServer(
    config: Config,
    underScoreDirname: string,
) {
    const targetDir = process.cwd();
    const webServerDirectory = join(targetDir, config.webServer);

    const server = webServerList[config.webServer];
    const templateBase = join(underScoreDirname, "..", "templates");

    const templatePath = join(templateBase, config.webServer);
    validateTemplate(templatePath);

    await Promise.allSettled([
        mkdir(webServerDirectory, { recursive: true }),
        copy({ copyPath: templatePath, targetDir: webServerDirectory }),
    ]);

    await setupEnv(config);
    await server(config);
    showCompletionMessage(config);
}

async function setupEnv(config: Config): Promise<void> {
    const { envContent, exEnvContent, prodEnvContent } = formatEnvFiles(config);
    const dotenvs: GenerateFileArgs[] = [
        { fileLocation: envFileLocation, fileContent: envContent },
        { fileLocation: envExampleFileLocation, fileContent: exEnvContent },
        { fileLocation: prodEnvFileLocation, fileContent: prodEnvContent },
    ];

    if (dotenvs.some(({ fileLocation }) => existsSync(fileLocation))) {
        await Promise.all(dotenvs.map((env) => appendExistsFile(env)));
    } else {
        await Promise.all(dotenvs.map((env) => generateFile(env)));
    }
}
