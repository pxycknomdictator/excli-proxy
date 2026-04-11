import { composeYamlLocation } from "../config";
import { isFileExists, write, loadYaml, dumpYaml } from "../utils";
import type { Config, DockerComposeConfig, WEB_SERVER_MODE } from "../types";

function generateNginxDockerComposeYaml(mode: WEB_SERVER_MODE) {
    const nginx: DockerComposeConfig = {
        services: {
            nginx: {
                image: "nginx:1.29.7",
                container_name: "nginx",
                ports: ["80:80"],
                volumes: ["./nginx/nginx.conf:/etc/nginx/nginx.conf:ro"],
                networks: ["app_network"],
                depends_on: {
                    server: {
                        condition: "service_started",
                    },
                    database: {
                        condition: "service_healthy",
                    },
                },
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
                depends_on: {
                    database: {
                        condition: "service_healthy",
                    },
                },
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

    return merged;
}

export async function setupNginx(config: Config) {
    const composeContent = generateNginxDockerComposeYaml(config.webServerMode);

    if (!isFileExists(composeYamlLocation)) {
        composeContent.networks = { app_network: {} };
        const composeYaml = dumpYaml(composeContent);

        await write({
            fileLocation: composeYamlLocation,
            fileContent: composeYaml,
        });
    } else {
        const fileObject = (await loadYaml(composeYamlLocation)) as any;

        if (!fileObject.networks) {
            fileObject.networks = { app_network: {} };
        } else {
            if (!("app_network" in fileObject.networks)) {
                fileObject.networks = {
                    ...fileObject.networks,
                    app_network: {},
                };
            }
        }

        fileObject.services = {
            ...(fileObject.services || {}),
            ...composeContent.services,
        };

        const updatedYaml = dumpYaml(fileObject);

        await write({
            fileLocation: composeYamlLocation,
            fileContent: updatedYaml,
        });
    }
}
