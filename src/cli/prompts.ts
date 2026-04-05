import { isCancel, select } from "@clack/prompts";
import { generateOptions, terminate } from "../utils";
import { USES_OF_WEB_SERVER, WEB_SERVERS } from "../config";
import type { WEB_SERVER, WEB_SERVER_MODE } from "../types";

async function promptWebServer(): Promise<WEB_SERVER> {
    const webServer = await select({
        message: "Select your proxy server:",
        options: generateOptions(WEB_SERVERS),
    });

    if (isCancel(webServer)) terminate("Process cancelled ❌");

    return webServer as WEB_SERVER;
}

async function promptProxyMode(): Promise<WEB_SERVER_MODE> {
    const webServerMode = await select({
        message: "Select proxy mode:",
        options: generateOptions(USES_OF_WEB_SERVER),
    });

    if (isCancel(webServerMode)) terminate("Process cancelled ❌");

    return webServerMode as WEB_SERVER_MODE;
}

export async function interactiveMode() {
    const { displayBanner } = await import("./display");
    displayBanner();

    const webServer = await promptWebServer();
    const webServerMode = await promptProxyMode();
    return { webServer, webServerMode };
}
