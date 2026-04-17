import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import type { Config } from "../types";

export function yargsWebServerInput(): Config {
    const argv = yargs(hideBin(process.argv))
        .option("nginx", {
            type: "boolean",
            description: "Use Nginx as the web server",
            conflicts: ["caddy", "traefik"],
        })
        .option("caddy", {
            type: "boolean",
            description: "Use Caddy as the web server",
            conflicts: ["nginx", "traefik"],
        })
        .option("traefik", {
            type: "boolean",
            description: "Use Traefik as the web server",
            conflicts: ["nginx", "caddy"],
        })
        .option("reverse-proxy", {
            type: "boolean",
            description: "Configure as a reverse proxy",
            conflicts: "load-balancing",
        })
        .option("load-balancing", {
            type: "boolean",
            description: "Configure with load balancing",
            conflicts: "reverse-proxy",
        })
        .check((argv) => {
            if (!argv.nginx && !argv.caddy && !argv.traefik) {
                throw new Error(
                    "You must specify a web server: --nginx, --caddy or --traefik",
                );
            }
            if (!argv["reverse-proxy"] && !argv["load-balancing"]) {
                throw new Error(
                    "You must specify a mode: --reverse-proxy or --load-balancing",
                );
            }
            return true;
        })
        .help()
        .alias("help", "h")
        .parseSync();

    let webServer: Config["webServer"];
    if (argv.nginx) webServer = "nginx";
    else if (argv.caddy) webServer = "caddy";
    else if (argv.traefik) webServer = "traefik";
    else throw new Error("Invalid web server");

    let webServerMode: Config["webServerMode"];
    if (argv["reverse-proxy"]) webServerMode = "reverse_proxy";
    else if (argv["load-balancing"]) webServerMode = "load_balancing";
    else throw new Error("Invalid mode");

    const config: Config = {
        webServer,
        webServerMode,
    };

    return config;
}
