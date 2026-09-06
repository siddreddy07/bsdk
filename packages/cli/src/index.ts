#!/usr/bin/env node

import * as p from "@clack/prompts";
import { installPackages } from "./installer.js";
import chalk from "chalk";
import { generateProviders } from "./provider-generator.js";
import { installKnowledge } from "./installers/knowledge.installer.js";
import { generateKnowledgeConfig } from "./generators/knowledge.generator.js";

const command = process.argv[2];

if (command !== "init") {
  console.log("Usage: bsdk init");
  process.exit(0);
}


console.clear();

const lime = chalk.hex("#B8D96A");

console.log(
  lime.bold(`
██████╗ ███████╗██████╗ ██╗  ██╗
██╔══██╗██╔════╝██╔══██╗██║ ██╔╝
██████╔╝███████╗██║  ██║█████╔╝
██╔══██╗╚════██║██║  ██║██╔═██╗
██████╔╝███████║██████╔╝██║  ██╗
╚═════╝ ╚══════╝╚═════╝ ╚═╝  ╚═╝
`)
);

console.log(
  chalk.hex("#8B8B8B")("Bot · Sense · Data · Knowledge")
);
console.log();

const setupMode = await p.select({
  message: chalk.bold("How are we building this?"),
  options: [
    {
      value: "bsdk",
      label: `${chalk.bold.cyan("⚡ BSDK Way")} ${chalk.dim("(Recommended if you're new)")}`,
    },
    {
      value: "byoc",
      label: `${chalk.bold.magenta("🧠 BYOC")} ${chalk.dim("(You know what you're doing... probably)")}`,
    },
  ],
});

if (p.isCancel(setupMode)) {
  p.cancel("Setup cancelled.");
  process.exit(0);
}


const providerPackages = {
  groq: "@ai-sdk/groq",
  google: "@ai-sdk/google",
  openai: "@ai-sdk/openai",
  anthropic: "@ai-sdk/anthropic",
};

const providers = await p.multiselect({
  message: "Choose AI providers (max 3)",
  options: [
    { value: "groq", label: "Groq" },
    { value: "google", label: "Gemini" },
    { value: "openai", label: "OpenAI" },
    { value: "anthropic", label: "Anthropic" },
  ],
  required: true,
  maxItems: 3,
});

if (p.isCancel(providers)) {
  p.cancel("Setup cancelled.");
  process.exit(0);
}

const packages = providers.map(
  (provider) => providerPackages[provider]
);

installPackages(packages);

generateProviders(providers);


const useKnowledge = await p.confirm({
  message: "Use (Pinecone) for vector db and (Cohere) for Embeddings?",
  initialValue: true,
});

if (p.isCancel(useKnowledge)) {
  p.cancel("Setup cancelled.");
  process.exit(0);
}

if (useKnowledge) {
  installKnowledge();
  chalk.green("Knowledge dependencies installed successfully .");
  generateKnowledgeConfig();
  lime.bold("Knowledge config generated successfully.");
}