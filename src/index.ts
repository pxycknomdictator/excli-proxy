#!/usr/bin/env node

import { getUserInputs } from "./cli";

async function main() {
    const config = await getUserInputs();
    console.log({ config });
}

main().catch((error) => {
    console.error("❌ Error creating project:", error);
    process.exit(1);
});
