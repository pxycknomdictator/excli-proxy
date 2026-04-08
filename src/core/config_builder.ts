import { join } from "node:path";
import { mkdir } from "node:fs/promises";
import { copy } from "../utils";
import { webServerList } from "../config";
import { validateTemplate } from "./validators";
import type { Config } from "../types";

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

    await server(config);
}
