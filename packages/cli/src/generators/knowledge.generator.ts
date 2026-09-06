// knowledge.generator.ts

import fs from "node:fs";
import path from "node:path";

export function generateKnowledgeConfig() {
  const bsdkDir = path.join(
    process.cwd(),
    "src",
    "bsdk"
  );

  fs.mkdirSync(bsdkDir, { recursive: true });

  const filePath = path.join(
    bsdkDir,
    "KnowledgeConfig.ts"
  );

  if (fs.existsSync(filePath)) {
    return;
  }

  const content = `export const knowledgeConfig = {
  pinecone: {
    apiKey: process.env.PINECONE_API_KEY!,
    indexHost: process.env.PINECONE_INDEX_HOST!,
  },

  cohere: {
    apiKey: process.env.COHERE_API_KEY!,
  },
};
`;

  fs.writeFileSync(filePath, content);
}