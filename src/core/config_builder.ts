import { join } from "node:path";
import { mkdir } from "node:fs/promises";
import { copy } from "../utils";
import { __dirname } from "../index";
import { webServerList } from "../config";
import { validateTemplate } from "./validators";
import type { Config } from "../types";

export async function setupWebServer(config: Config) {
    const targetDir = process.cwd();
    const webServerDirectory = join(targetDir, config.webServer);

    const server = webServerList[config.webServer];
    const templateBase = join(__dirname, "..", "templates");

    const templatePath = join(templateBase, config.webServer);
    validateTemplate(templatePath);

    await Promise.allSettled([
        mkdir(webServerDirectory, { recursive: true }),
        copy({ copyPath: templatePath, targetDir: webServerDirectory }),
    ]);

    await server(config);
}
