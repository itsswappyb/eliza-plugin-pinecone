import { elizaLogger } from "@elizaos/core";
import {
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
} from "@elizaos/core";

import { chatWithAgentExamples } from "../examples";
import { createChatService } from "../services";
import { validatePineconeAgentConfig } from "../environment";
import { ChatMessage } from "../types";

export const chatWithAgent: Action = {
    name: "CHAT_WITH_AGENT",
    similes: [
        "CHAT",
        "TALK",
        "CONVERSE",
        "DISCUSS",
        "SPEAK",
        "COMMUNICATE",
        "MESSAGE",
        "CONVERSATION",
        "DIALOGUE",
        "ASK",
    ],
    description: "Get the current weather for a given location",
    validate: async (runtime: IAgentRuntime) => {
        await validatePineconeAgentConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        // Initialize/update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        }
        state = await runtime.updateRecentMessageState(state);

        // Instantiate API service
        const config = await validatePineconeAgentConfig(runtime);
        const chatService = createChatService(
            config.PINECONE_API_KEY,
            config.PINECONE_AGENT_NAME
        );

        // Transform messages into ChatMessage format
        const messages: ChatMessage[] = state.recentMessagesData.map((msg) => ({
            role: msg.userId === runtime.agentId ? "assistant" : "user",
            content: msg.content.text,
        }));

        // Fetch chat response & respond
        try {
            const chatResponse = await chatService.chat({
                messages,
                stream: false,
                model: ModelClass.SMALL,
            });

            elizaLogger.success(
                `Successfully got chat response from Pinecone agent`
            );

            if (callback) {
                callback({
                    text: chatResponse.message.content,
                    content: chatResponse,
                });

                return true;
            }
        } catch (error) {
            elizaLogger.error("Error in CHAT_WITH_AGENT handler:", error);

            callback({
                text: `Error getting chat response: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }

        return;
    },
    examples: chatWithAgentExamples as ActionExample[][],
} as Action;
