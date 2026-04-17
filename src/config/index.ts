import { join } from "node:path";
import { setupCaddy, setupNginx, setupTraefik } from "../proxy";
import type {
    DockerComposeConfig,
    INTERACTIVE_PROMPTS,
    WebServerList,
} from "../types";

const rootDir = process.cwd();

const composeYaml = "compose.yaml";
export const composeYamlLocation = join(rootDir, composeYaml);

export const BANNER_FONT = "Standard";

export const WEB_SERVERS: INTERACTIVE_PROMPTS[] = [
    { label: "Nginx", emoji: "⚡", value: "nginx" },
    { label: "Caddy", emoji: "🪄", value: "caddy" },
    { label: "Traefik", emoji: "🛣️", value: "traefik" },
];

export const USES_OF_WEB_SERVER: INTERACTIVE_PROMPTS[] = [
    { label: "Reverse Proxy", emoji: "🚦", value: "reverse_proxy" },
    { label: "Load Balancing", emoji: "⚖️", value: "load_balancing" },
];

export const webServerList: WebServerList = {
    nginx: setupNginx,
    caddy: setupCaddy,
    traefik: setupTraefik,
};

export function dockerServerConfig(): DockerComposeConfig {
    const server: DockerComposeConfig = {
        services: {
            server: {
                build: {
                    context: ".",
                    dockerfile: "Dockerfile",
                },
                restart: "unless-stopped",
                env_file: [".env"],
                networks: ["app_network"],
                depends_on: { database: { condition: "service_healthy" } },
            },
        },
    };
    return server;
}
