import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const pineconeEnvSchema = z.object({
    PINECONE_API_KEY: z.string().min(1, "Pinecone API key is required"),
    PINECONE_AGENT_NAME: z.string().min(1, "Pinecone Agent name is required"),
});

export type PineconeAgentConfig = z.infer<typeof pineconeEnvSchema>;

export async function validatePineconeAgentConfig(
    runtime: IAgentRuntime
): Promise<PineconeAgentConfig> {
    try {
        const config = {
            PINECONE_API_KEY: runtime.getSetting("PINECONE_API_KEY"),
            PINECONE_AGENT_NAME: runtime.getSetting("PINECONE_AGENT_NAME"),
        };

        return pineconeEnvSchema.parse(config);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `Pinecone Agent configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}
