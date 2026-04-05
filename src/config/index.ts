import { join } from "node:path";
import { setupCaddy, setupNginx } from "../proxy";
import type { INTERACTIVE_PROMPTS } from "../types";

const rootDir = process.cwd();

const nginxConf = "nginx.conf";
const composeYaml = "compose.yaml";

export const nginxConfLocation = join(rootDir, nginxConf);
export const composeYamlLocation = join(rootDir, composeYaml);

export const BANNER_FONT = "Standard";

export const WEB_SERVERS: INTERACTIVE_PROMPTS[] = [
    { label: "Nginx", emoji: "⚡", value: "nginx" },
    { label: "Caddy", emoji: "🪄", value: "caddy" },
];

export const USES_OF_WEB_SERVER: INTERACTIVE_PROMPTS[] = [
    { label: "Reverse Proxy", emoji: "🚦", value: "reverse_proxy" },
    { label: "Load Balancing", emoji: "⚖️", value: "load_balancing" },
];

export const webServerList = {
    nginx: setupNginx,
    caddy: setupCaddy,
};
