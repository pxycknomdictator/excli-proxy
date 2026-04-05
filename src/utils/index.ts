import yaml from "js-yaml";
import { existsSync } from "node:fs";
import { cp, readFile, writeFile } from "node:fs/promises";
import { cancel } from "@clack/prompts";
import type {
    COPY_FN_PROPS,
    DockerComposeConfig,
    GenerateFileArgs,
    INTERACTIVE_PROMPTS,
} from "../types";

export async function copy({ copyPath, targetDir }: COPY_FN_PROPS) {
    try {
        await cp(copyPath, targetDir, { recursive: true });
    } catch (error) {
        throw new Error(`Failed to copy: ${error}`);
    }
}

export async function loadYaml(location: string): Promise<DockerComposeConfig> {
    try {
        const yamlContent = await read(location);
        const objectContent = yaml.load(yamlContent) as DockerComposeConfig;
        return objectContent;
    } catch (error) {
        throw new Error(`failed to read yaml file: ${error}`);
    }
}

export function dumpYaml(content: DockerComposeConfig): string {
    const yamlContent = yaml.dump(content, { indent: 4 });
    return yamlContent;
}

export async function write({ fileContent, fileLocation }: GenerateFileArgs) {
    try {
        await writeFile(fileLocation, fileContent, "utf-8");
    } catch (error) {
        throw new Error(`Failed to write file: ${error}`);
    }
}

export async function read(location: string) {
    try {
        const file = await readFile(location, { encoding: "utf-8" });
        return file;
    } catch (error) {
        throw new Error(`Failed to read file: ${error}`);
    }
}

export const isFileExists = (location: string) => existsSync(location);

export function generateOptions(options: INTERACTIVE_PROMPTS[]) {
    return options.map(({ label, emoji, value }: INTERACTIVE_PROMPTS) => ({
        label: `${label} ${emoji}`,
        value: value,
    }));
}

export function terminate(message: string): never {
    cancel(message);
    process.exit(0);
}
