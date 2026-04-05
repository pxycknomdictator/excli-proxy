import { join } from "node:path";
import { __dirname } from "../index";
import { webServerList } from "../config";
import type { Config } from "../types";
import { validateTemplate } from "./validators";

export async function setupWebServer(config: Config) {
    const server = webServerList[config.webServer];
    const templateBase = join(__dirname, "..", "templates");

    const templatePath = join(templateBase, config.webServer);
    validateTemplate(templatePath);

    await server(config);
}
