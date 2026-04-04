import { existsSync } from "node:fs";
import { cp, readFile } from "node:fs/promises";
import { cancel } from "@clack/prompts";
import type { COPY_FN_PROPS, INTERACTIVE_PROMPTS } from "../types";

export async function copy({ copyPath, targetDir }: COPY_FN_PROPS) {
    try {
        await cp(copyPath, targetDir, { recursive: true });
    } catch (error) {
        throw new Error(`Failed to copy: ${error}`);
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
