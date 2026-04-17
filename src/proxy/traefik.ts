import { composeYamlLocation, dockerServerConfig } from "../config";
import { isFileExists, write, loadYaml, dumpYaml } from "../utils";
import type { Config, DockerComposeConfig, WEB_SERVER_MODE } from "../types";

function generateTraefikDockerComposeYaml(mode: WEB_SERVER_MODE) {
    const nginx: DockerComposeConfig = {
        services: {
            traefik: {
                image: "traefik:v3.6",
                container_name: "traefik",
                restart: "unless-stopped",
                ports: ["80:80", "8080:8080"],
                volumes: [
                    "/var/run/docker.sock:/var/run/docker.sock:ro",
                    "./traefik/traefik.yaml:/etc/traefik/traefik.yaml:ro",
                ],
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

    server.services.server!.labels = [
        "traefik.enable=true",
        "traefik.http.routers.app.rule=Host(`localhost`)",
        "traefik.http.routers.app.entrypoints=web",
        "traefik.http.services.app.loadbalancer.server.port=3000",
    ];

    const merged: DockerComposeConfig = {
        services: {
            ...nginx.services,
            ...server.services,
        },
    };

    return merged;
}

export async function setupTraefik(config: Config) {
    const composeContent = generateTraefikDockerComposeYaml(
        config.webServerMode,
    );

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
