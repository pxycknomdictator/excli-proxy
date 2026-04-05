#!/usr/bin/env node

import { getUserInputs } from "./cli";
import { setupWebServer } from "./core/config_builder";

async function main() {
    const config = await getUserInputs();
    await setupWebServer(config);
}

main().catch((error) => {
    console.error("❌ Error creating project:", error);
    process.exit(1);
});
