import type { KnowledgeConfig } from "../services/knowledge/search.js";

import { createSearchKnowledgeTool } from "./search-knowledge.tool.js";

export function createBSDKTools(
  knowledge?: KnowledgeConfig,
  namespace? :string
) {
  return {

    ...(knowledge && namespace && {
      searchKnowledge: createSearchKnowledgeTool(knowledge,namespace),
    }),
  };
}