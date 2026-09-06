import { installPackages } from "../installer.js";

export function installKnowledge() {
  installPackages([
    "@pinecone-database/pinecone",
    "cohere-ai",
  ]);
}