## Proxy CLI Tool

A CLI generator for reverse proxy and load balancing configurations for Express.js applications, with support for Nginx, Caddy, and Traefik.

[![npm version](https://badge.fury.io/js/%40excli%2Fproxy.svg)](https://badge.fury.io/js/%40excli%2Fproxy)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Features

- Reverse proxy configuration for Express.js apps
- Load balancing across multiple Express instances
- Nginx, Caddy, and Traefik support
- Security headers included by default
- Docker Compose ready
- Interactive mode or quick flag-based setup

## Requirements

- Node.js 20 or higher
- Docker Desktop or Docker Engine

## Quick Start

### Interactive mode

```bash
npx @excli/proxy
```

You'll be prompted to choose a proxy server (Nginx, Caddy, or Traefik) and a mode (reverse proxy or load balancing).

### Flag mode

```bash
npx @excli/proxy --nginx --reverse-proxy
```

### Global install

```bash
npm install -g @excli/proxy

excli-proxy                              # interactive
excli-proxy --caddy --load-balancing     # with flags
```

## Flags

| Category     | Flags                                 |
| ------------ | ------------------------------------- |
| Proxy server | `--nginx`, `--caddy`, `--traefik`     |
| Mode         | `--reverse-proxy`, `--load-balancing` |

Every proxy server works with every mode:

```bash
npx @excli/proxy --nginx --reverse-proxy
npx @excli/proxy --nginx --load-balancing
npx @excli/proxy --caddy --reverse-proxy
npx @excli/proxy --caddy --load-balancing
npx @excli/proxy --traefik --reverse-proxy
npx @excli/proxy --traefik --load-balancing
```

## Generated Files

| File                                        | Purpose                                                 |
| ------------------------------------------- | ------------------------------------------------------- |
| `nginx.conf` / `Caddyfile` / `traefik.yaml` | Proxy configuration for your chosen server              |
| `compose.yaml`                              | Multi-service setup for the proxy and Express instances |
| `.env`                                      | Local proxy configuration                               |
| `.env.production`                           | Proxy configuration used by the production setup        |

## Proxy Servers

| Proxy   | SSL/TLS                | Config File    |
| ------- | ---------------------- | -------------- |
| Nginx   | Manual cert config     | `nginx.conf`   |
| Caddy   | Automatic HTTPS (ACME) | `Caddyfile`    |
| Traefik | Automatic HTTPS (ACME) | `traefik.yaml` |

## Running Your Proxy

```bash
docker compose up                      # start proxy and Express instances
docker compose up -d                   # start in detached mode
docker compose up --scale server=5     # run 5 Express instances
docker compose down                    # stop all services
docker compose logs                    # view logs
```

Once running, your Express app is available through the proxy at `http://localhost`. All upstream instances are registered automatically, and health checks skip unhealthy ones.

## Config Validation

```bash
nginx -t                                      # Nginx: test config syntax
nginx -s reload                               # Nginx: reload without downtime
caddy validate --config Caddyfile             # Caddy: validate config
caddy reload --config Caddyfile               # Caddy: reload without downtime
traefik --configfile=traefik.yaml --dry-run   # Traefik: validate static config
```

## Troubleshooting

**Port 80 or 443 already in use?**
Stop the other web server, or change the port mappings in `compose.yaml`.

**502 Bad Gateway?**
Your Express instances may not be running or are listening on a different port. Make sure the port in `compose.yaml` matches your app's listen port.

**Caddy not provisioning SSL automatically?**
Your domain must be publicly reachable with DNS pointing to your server, since Caddy needs it for Let's Encrypt ACME challenges.

**Interactive mode not working?**
Update to the latest version: `npm install -g @excli/proxy@latest`

**Still stuck?**
Open an issue on GitHub with details about your problem.

## Contributing

Contributions are welcome: bug reports, feature ideas, documentation fixes, and pull requests.

## License

ISC. See the `LICENSE` file for details.

## Author

**Noman**
[pxycknomdictator@gmail.com](mailto:pxycknomdictator@gmail.com) | [@pxycknomdictator](https://github.com/pxycknomdictator)
