export type WEB_SERVER = "nginx" | "caddy";

export type INTERACTIVE_PROMPTS = {
    label: string;
    emoji: string;
    value: string;
};

export type COPY_FN_PROPS = {
    copyPath: string;
    targetDir: string;
};
