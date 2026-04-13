### Proxy CLI Tool

A powerful reverse proxy and load balancing configuration generator for Express.js applications.

[![npm version](https://badge.fury.io/js/%40excli%2Fproxy.svg)](https://badge.fury.io/js/%40excli%2Fproxy)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

---

### Why Choose This Generator?

A CLI tool for generating reverse proxy and load balancing configurations for Express.js applications — with support for Nginx and Caddy, and two simple modes to get you running fast.

**Built for modern backend development:**

- 🔀 Reverse proxy configuration for Express.js apps
- ⚖️ Load balancing across multiple Express instances
- 🌐 Nginx and Caddy support
- 🛡️ Security headers included by default
- 🐳 Docker Compose ready
- 🎯 **Interactive mode** for guided setup
- 🎨 **Simple flag-based CLI** for quick configuration

---

### Getting Started

#### Interactive Mode (Recommended for Beginners)

Simply run the command and follow the prompts:

```bash
npx @excli/proxy
```

The interactive mode will guide you through selecting:

- Proxy server (Nginx or Caddy)
- Mode (Reverse Proxy or Load Balancing)

#### Quick Setup with Flags

For experienced users who know what they want:

```bash
# Nginx reverse proxy
npx @excli/proxy --nginx --reverse-proxy

# Caddy load balancing
npx @excli/proxy --caddy --load-balancing
```

**Or install globally:**

```bash
npm install -g @excli/proxy

# Interactive mode
excli-proxy

# With flags
excli-proxy --nginx --reverse-proxy
excli-proxy --caddy --load-balancing
```

#### Requirements

- Node.js 20 or higher
- Docker Desktop or Docker Engine (required for running generated configurations)

---

### Usage

#### Two Ways to Use

**1. Interactive Mode (Easiest)**

```bash
npx @excli/proxy
```

Just answer the prompts and you're done!

**2. Flag-Based Mode (Fastest)**

```bash
# Nginx with reverse proxy
npx @excli/proxy --nginx --reverse-proxy

# Nginx with load balancing
npx @excli/proxy --nginx --load-balancing

# Caddy with reverse proxy
npx @excli/proxy --caddy --reverse-proxy

# Caddy with load balancing
npx @excli/proxy --caddy --load-balancing
```

---

### Command-Line Flags

#### Proxy Server Flags

- `--nginx` - Use Nginx as the proxy server
- `--caddy` - Use Caddy as the proxy server

#### Mode Flags

- `--reverse-proxy` - Generate a reverse proxy configuration
- `--load-balancing` - Generate a load balancing configuration

**All valid combinations:**

```bash
npx @excli/proxy --nginx --reverse-proxy
npx @excli/proxy --nginx --load-balancing
npx @excli/proxy --caddy --reverse-proxy
npx @excli/proxy --caddy --load-balancing
```

---

### What's Included

#### Generated Files

- **nginx.conf / Caddyfile** - Production-ready proxy configuration
- **compose.yaml** - Multi-service orchestration for your proxy + Express instances

---

#### Proxy Server Options

| Proxy     | SSL/TLS                | Modes                         | Config File  |
| --------- | ---------------------- | ----------------------------- | ------------ |
| **Nginx** | Manual cert config     | reverse-proxy, load-balancing | `nginx.conf` |
| **Caddy** | Automatic HTTPS (ACME) | reverse-proxy, load-balancing | `Caddyfile`  |

---

### Common Commands

#### Running Your Proxy

```bash
docker compose up             # Start proxy and Express instances
docker compose down           # Stop all services
docker compose up -d          # Start services in detached mode
docker compose scale server=5 # Scale Express instances dynamically
```

#### Nginx

```bash
nginx -t          # Test configuration for syntax errors
nginx -s reload   # Reload config without downtime
```

#### Caddy

```bash
caddy validate --config Caddyfile   # Validate configuration
caddy reload --config Caddyfile     # Reload config without downtime
```

---

### Managing Your Proxy

After running `docker compose up`, your Express app will be accessible through the proxy at `http://localhost`.

- All upstream instances are automatically registered
- Health checks are configured out of the box to skip unhealthy instances
- Logs are routed through Docker for easy inspection with `docker compose logs`

---

### Troubleshooting

**Port 80 or 443 already in use?**
Check if another web server is running on those ports, or update the port mappings in your `compose.yaml`.

**502 Bad Gateway?**
Your Express app instances may not be running or are listening on the wrong port. Verify the port in your `compose.yaml` matches your Express app's listen port.

**Caddy not provisioning SSL automatically?**
Ensure your domain is publicly accessible and DNS is pointing to your server. Caddy requires a reachable domain for Let's Encrypt ACME challenges.

**Interactive mode not working?**
Make sure you're using the latest version: `npm install -g @excli/proxy@latest`

**Need help?**
Open an issue on GitHub with details about your problem.

---

### Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

---

### License

ISC License - see LICENSE file for details.

### Author

**Noman**  
📧 [pxycknomdictator@gmail.com](mailto:pxycknomdictator@gmail.com)  
🔗 [@pxycknomdictator](https://github.com/pxycknomdictator)

---

**Happy coding! Built with ❤️ for developers who value productivity.**
