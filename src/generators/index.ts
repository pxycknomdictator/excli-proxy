import { existsSync } from "node:fs";
import type { Config, GenerateFileArgs } from "../types";
import { appendExistsFile, formatEnvFiles, generateFile } from "../utils";
import { envFileLocation, prodEnvFileLocation } from "../config";

export async function setupEnv(config: Config): Promise<void> {
    const { envContent, prodEnvContent } = formatEnvFiles(config);

    const dotenvs: GenerateFileArgs[] = [
        { fileLocation: envFileLocation, fileContent: envContent },
        { fileLocation: prodEnvFileLocation, fileContent: prodEnvContent },
    ];

    if (existsSync(envFileLocation) || existsSync(prodEnvFileLocation)) {
        await Promise.all(dotenvs.map((env) => appendExistsFile({ ...env })));
    } else {
        await Promise.all(dotenvs.map((env) => generateFile({ ...env })));
    }
}
