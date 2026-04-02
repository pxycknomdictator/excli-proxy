import { isCancel, select } from "@clack/prompts";
import { WEB_SERVERS } from "../config";
import { generateOptions, terminate } from "../utils";
import type { WEB_SERVER } from "../types";

export async function promptWebServer(): Promise<WEB_SERVER> {
    const webServer = await select({
        message: "Select your proxy server:",
        options: generateOptions(WEB_SERVERS),
    });

    if (isCancel(webServer)) terminate("Process cancelled ❌");

    return webServer as WEB_SERVER;
}
