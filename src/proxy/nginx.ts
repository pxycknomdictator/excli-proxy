import { composeYamlLocation, dockerServerConfig } from "../config";
import { isFileExists, write, loadYaml, dumpYaml } from "../utils";
import type { Config, DockerComposeConfig, WEB_SERVER_MODE } from "../types";

function generateNginxDockerComposeYaml(mode: WEB_SERVER_MODE) {
    const nginx: DockerComposeConfig = {
        services: {
            nginx: {
                container_name: "nginx",
                image: "nginx:${NGINX_VERSION}",
                restart: "unless-stopped",
                ports: ["${NGINX_PORT}:80"],
                volumes: ["./nginx/nginx.conf:/etc/nginx/nginx.conf:ro"],
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
            ...nginx.services,
            ...server.services,
        },
    };

    return merged;
}

export async function setupNginx(config: Config) {
    const composeContent = generateNginxDockerComposeYaml(config.webServerMode);

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
