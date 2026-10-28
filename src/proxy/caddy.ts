import { composeYamlLocation, dockerServerConfig } from "../config";
import { dumpYaml, isFileExists, loadYaml, write } from "../utils";
import type { Config, DockerComposeConfig, WEB_SERVER_MODE } from "../types";

function generateCaddyDockerComposeYaml(mode: WEB_SERVER_MODE) {
    const caddy: DockerComposeConfig = {
        services: {
            caddy: {
                container_name: "caddy",
                image: "caddy:${CADDY_VERSION}",
                restart: "unless-stopped",
                ports: ["${CADDY_PORT}:80"],
                volumes: ["./caddy/Caddyfile:/etc/caddy/Caddyfile:ro"],
                networks: ["app_network"],
                depends_on: { server: { condition: "service_started" } },
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
        const composeYaml = dumpYaml(composeContent);

        await write({
            fileLocation: composeYamlLocation,
            fileContent: composeYaml,
        });
    } else {
        const fileObject = (await loadYaml(composeYamlLocation)) as any;

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
