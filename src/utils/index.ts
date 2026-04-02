import { cancel } from "@clack/prompts";
import type { INTERACTIVE_PROMPTS } from "../types";

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
