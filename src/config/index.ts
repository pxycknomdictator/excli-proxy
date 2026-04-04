import type { INTERACTIVE_PROMPTS } from "../types";

export const BANNER_FONT = "Standard";

export const WEB_SERVERS: INTERACTIVE_PROMPTS[] = [
    { label: "Nginx", emoji: "⚡", value: "nginx" },
    { label: "Caddy", emoji: "🪄", value: "caddy" },
];

export const USES_OF_WEB_SERVER: INTERACTIVE_PROMPTS[] = [
    { label: "Reverse Proxy", emoji: "🚦", value: "reverse_proxy" },
    { label: "Load Balancing", emoji: "⚖️", value: "load_balancing" },
];
