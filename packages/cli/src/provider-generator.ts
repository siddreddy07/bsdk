import fs from "node:fs";
import path from "node:path";

export function generateProviders(providers: string[]) {
  const lines: string[] = [];

  if (providers.includes("groq")) {
    lines.push(`import { createGroq } from "@ai-sdk/groq";`);
    lines.push("");
    lines.push(`export const groq = createGroq({`);
    lines.push(`  apiKey: process.env.GROQ_API_KEY!,`);
    lines.push(`});`);
    lines.push("");
  }

  if (providers.includes("google")) {
    lines.push(`import { createGoogleGenerativeAI } from "@ai-sdk/google";`);
    lines.push("");
    lines.push(`export const google = createGoogleGenerativeAI({`);
    lines.push(`  apiKey: process.env.GEMINI_API_KEY!,`);
    lines.push(`});`);
    lines.push("");
  }

  if (providers.includes("openai")) {
    lines.push(`import { createOpenAI } from "@ai-sdk/openai";`);
    lines.push("");
    lines.push(`export const openai = createOpenAI({`);
    lines.push(`  apiKey: process.env.OPENAI_API_KEY!,`);
    lines.push(`});`);
    lines.push("");
  }

  if (providers.includes("anthropic")) {
    lines.push(`import { createAnthropic } from "@ai-sdk/anthropic";`);
    lines.push("");
    lines.push(`export const anthropic = createAnthropic({`);
    lines.push(`  apiKey: process.env.ANTHROPIC_API_KEY!,`);
    lines.push(`});`);
  }

  const bsdkDir = path.join(process.cwd(),"src", "bsdk");

  fs.mkdirSync(bsdkDir, { recursive: true });

    const filePath = path.join(bsdkDir, "providers.ts");
  
    if (fs.existsSync(filePath)) {
    return;
    }

  fs.writeFileSync(
    path.join(bsdkDir, "providers.ts"),
    lines.join("\n")
  );
}