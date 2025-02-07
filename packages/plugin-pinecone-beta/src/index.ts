import { Plugin } from "@elizaos/core";
// import { createAgent } from "./actions/createAgent";
import { chatWithAgent } from "./actions/chatWithAgent";

export const pineconeBetaPlugin: Plugin = {
    name: "pinecone-beta",
    description: "Pinecone Beta RAG Agent plugin for Eliza",
    actions: [chatWithAgent],
    // evaluators analyze the situations and actions taken by the agent. they run after each agent action
    // allowing the agent to reflect on what happened and potentially trigger additional actions or modifications
    evaluators: [],
    // providers supply information and state to the agent's context, help agent access necessary data
    providers: [],
};
export default pineconeBetaPlugin;
