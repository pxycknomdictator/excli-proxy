import { composeYamlLocation, dockerServerConfig } from "../config";
import { dumpYaml, isFileExists, loadYaml, write } from "../utils";
import type { Config, DockerComposeConfig, WEB_SERVER_MODE } from "../types";

function generateCaddyDockerComposeYaml(mode: WEB_SERVER_MODE) {
    const caddy: DockerComposeConfig = {
        services: {
            caddy: {
                image: "caddy:2.11.2",
                container_name: "caddy",
                restart: "unless-stopped",
                ports: ["80:80"],
                volumes: ["./caddy/Caddyfile:/etc/caddy/Caddyfile:ro"],
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

    const server = dockerServerConfig();

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
    const composeContent = generateCaddyDockerComposeYaml(config.webServerMode);

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
