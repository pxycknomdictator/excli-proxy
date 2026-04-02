#!/usr/bin/env node

async function main() {
    console.log("Hello @excli/proxy");
}

main().catch((error) => {
    console.error("❌ Error creating project:", error);
    process.exit(1);
});
