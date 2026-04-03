export function dockerNginxConfig() {
    return {
        services: {
            nginx: {
                image: "nginx:1.29.7",
                container_name: "nginx",
                ports: ["80:80"],
                volumes: ["./nginx.conf:/etc/nginx/nginx.conf:ro"],
                depends_on: ["server", "database"],
                networks: ["app_network"],
            },
        },
    };
}
