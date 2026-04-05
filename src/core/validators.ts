import { existsSync } from "node:fs";
import { terminate } from "../utils";

export function validateTemplate(templatePath: string): void {
    if (!existsSync(templatePath)) {
        terminate(`❌ Template not found at: ${templatePath}`);
    }
}
