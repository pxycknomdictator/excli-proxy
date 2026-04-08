#!/usr/bin/env node

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getUserInputs } from "./cli";
import { setupWebServer } from "./core";

async function main() {
    const underScoreFilename = fileURLToPath(import.meta.url);
    const underScoreDirname = dirname(underScoreFilename);

    const config = await getUserInputs();
    await setupWebServer(config, underScoreDirname);
}

main().catch((error) => {
    console.error("❌ Error creating project:", error);
    process.exit(1);
});
