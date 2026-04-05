#!/usr/bin/env node

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getUserInputs } from "./cli";
import { setupWebServer } from "./core";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

async function main() {
    const config = await getUserInputs();
    await setupWebServer(config);
}

main().catch((error) => {
    console.error("❌ Error creating project:", error);
    process.exit(1);
});
