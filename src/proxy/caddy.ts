import type { Config, DockerComposeConfig, WEB_SERVER_MODE } from "../types";

function generateCaddyDockerComposeYaml(mode: WEB_SERVER_MODE) {
    const caddy: DockerComposeConfig = {
        services: {
            caddy: {
                image: "caddy:2.11.2",
                container_name: "caddy",
                ports: ["80:80"],
                volumes: ["./caddy/Caddyfile:/etc/caddy/Caddyfile:ro"],
                depends_on: ["server", "database"],
                networks: ["app_network"],
            },
        },
    };

    const server: DockerComposeConfig = {
        services: {
            server: {
                build: {
                    context: ".",
                    dockerfile: "Dockerfile",
                },
                env_file: [".env"],
                networks: ["app_network"],
                depends_on: ["database"],
            },
        },
    };

    if (mode === "reverse_proxy") {
        server.services.server!.container_name = "server";
    }

    const merged: DockerComposeConfig = {
        services: {
            ...caddy.services,
            ...server.services,
        },
    };

    return merged;
}

export async function setupCaddy(config: Config) {
    generateCaddyDockerComposeYaml(config.webServerMode);
    console.log("Caddy", config);
}
