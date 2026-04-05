import { webServerList } from "../config";
import type { Config } from "../types";

export async function setupWebServer(config: Config) {
    const server = webServerList[config.webServer];
    await server(config);
}
