export type WEB_SERVER = "nginx" | "caddy";
export type WEB_SERVER_MODE = "reverse_proxy" | "load_balancing";

export type Config = {
    webServer: WEB_SERVER;
    webServerMode: WEB_SERVER_MODE;
};

export type INTERACTIVE_PROMPTS = {
    label: string;
    emoji: string;
    value: string;
};

export type COPY_FN_PROPS = {
    copyPath: string;
    targetDir: string;
};

export type DockerComposeConfig = {
    services: {
        [key: string]: {
            container_name?: string;
            image?: string;
            build?: { context: string; dockerfile: string };
            ports?: string[];
            env_file?: string[];
            networks?: string[];
            volumes?: string[];
            depends_on?: string[];
        };
    };
};

export type GenerateFileArgs = {
    fileLocation: string;
    fileContent: string;
};

export type WebServerList = {
    nginx: (config: Config) => Promise<void>;
    caddy: (config: Config) => Promise<void>;
};
