import { existsSync } from "node:fs";
import type { Config, GenerateFileArgs } from "../types";
import { appendExistsFile, formatEnvFiles, generateFile } from "../utils";
import {
    envExampleFileLocation,
    envFileLocation,
    prodEnvFileLocation,
} from "../config";

export async function setupEnv(config: Config): Promise<void> {
    const { envContent, exEnvContent, prodEnvContent } = formatEnvFiles(config);

    const dotenvs: GenerateFileArgs[] = [
        { fileLocation: envFileLocation, fileContent: envContent },
        { fileLocation: prodEnvFileLocation, fileContent: prodEnvContent },
        {
            fileLocation: envExampleFileLocation,
            fileContent: exEnvContent,
        },
    ];

    if (
        existsSync(envFileLocation) ||
        existsSync(envExampleFileLocation) ||
        existsSync(prodEnvFileLocation)
    ) {
        await Promise.all(dotenvs.map((env) => appendExistsFile({ ...env })));
    } else {
        await Promise.all(dotenvs.map((env) => generateFile({ ...env })));
    }
}
