import type { DockerComposeConfig, NGINX_MODE } from "../types";

export function dockerNginxConfig() {
    const dockerNginx: DockerComposeConfig = {
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

    return dockerNginx;
}

export function nodeServerConfig(mode: NGINX_MODE) {
    const dockerServerConfig: DockerComposeConfig = {
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
        dockerServerConfig.services.server!.container_name = "nginx";
    }

    return dockerServerConfig;
}
