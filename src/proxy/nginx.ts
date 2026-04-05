import yaml from "js-yaml";
import type { Config, DockerComposeConfig, WEB_SERVER_MODE } from "../types";

export function generateNginxDockerComposeYaml(mode: WEB_SERVER_MODE): string {
    const nginx: DockerComposeConfig = {
        services: {
            nginx: {
                image: "nginx:1.29.7",
                container_name: "nginx",
                ports: ["80:80"],
                volumes: ["./nginx.conf:/etc/nginx/nginx.conf:ro"],
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
            ...nginx.services,
            ...server.services,
        },
    };

    return yaml.dump(merged, { indent: 4 });
}

export async function setupNginx(config: Config) {
    console.log("Nginx", config);
}
