import figlet from "figlet";
import { note, outro } from "@clack/prompts";
import { BANNER_FONT } from "../config";
import type { Config } from "../types";

export function displayBanner(): void {
    console.clear();

    const banner = figlet.textSync("Proxy", {
        font: BANNER_FONT,
        horizontalLayout: "full",
        verticalLayout: "full",
    });

    console.log(`\x1b[96m ${banner} \x1b[0m`);
}

export function showCompletionMessage(config: Config) {
    const { webServerMode } = config;

    const commands = [
        webServerMode === "load_balancing"
            ? "docker compose up --scale server=4 -d"
            : "docker compose up -d",
    ];

    note(commands.join("\n"), "🚀 Ready to start");
    outro("Happy coding! ✨");
}
