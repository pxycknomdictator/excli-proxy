import type { Config } from "../types";
import { interactiveMode } from "./prompts";
import { yargsWebServerInput } from "./yargs";

export async function getUserInputs(): Promise<Config> {
    const args = process.argv.slice(2);
    if (args.length > 0) return yargsWebServerInput();
    return interactiveMode();
}
