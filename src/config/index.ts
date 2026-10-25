import { join } from "node:path";
import { setupCaddy, setupNginx, setupTraefik } from "../proxy";
import type {
    DockerComposeConfig,
    INTERACTIVE_PROMPTS,
    WebServerList,
} from "../types";

const rootDir = process.cwd();

const composeProductionYaml = "compose.prod.yaml";
export const composeProductionYamlLocation = join(
    rootDir,
    composeProductionYaml,
);

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
                env_file: [".env.production"],
                networks: ["app_network"],
                depends_on: { database: { condition: "service_healthy" } },
            },
        },
    };
    return server;
}

export const envConfigs = {
    nginx: { NGINX_VERSION: "1.29.7", NGINX_PORT: "80" },
    caddy: { CADDY_VERSION: "2.11.2", CADDY_PORT: "80" },
    traefik: {
        TRAEFIK_VERSION: "v3.6",
        TRAEFIK_PORT: "80",
        TRAEFIK_DASHBOARD_PORT: "8080",
    },
};

export const serverSections = {
    nginx: {
        main: "# Nginx Configuration",
        mainKeys: ["NGINX_VERSION", "NGINX_PORT"],
    },
    caddy: {
        main: "# Caddy Configuration",
        mainKeys: ["CADDY_VERSION", "CADDY_PORT"],
    },
    traefik: {
        main: "# Traefik Configuration",
        mainKeys: ["TRAEFIK_VERSION", "TRAEFIK_PORT", "TRAEFIK_DASHBOARD_PORT"],
    },
};
