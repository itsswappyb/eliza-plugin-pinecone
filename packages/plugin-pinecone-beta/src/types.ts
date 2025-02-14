// add CreateAgentResponse, UploadFileResponse, ChatResponse types
export interface CreateAgentResponse {
    name: string;
    instructions: string;
    metadata: Record<string, any>;
    status: string;
    host: string;
    created_at: string;
    updated_at: string;
}

// ... existing code ...

export interface UploadFileResponse {
    name: string;
    id: string;
    metadata: Record<string, any>;
    created_on: string;
    updated_on: string;
    status: string;
    percent_done: number;
    signed_url: string;
    error_message: string;
}

export interface ChatMessage {
    role: string;
    content: string;
}

export interface TokenUsage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

export interface FileReference {
    status: string;
    id: string;
    name: string;
    size: number;
    metadata: Record<string, any> | null;
    updated_on: string;
    created_on: string;
    percent_done: number;
    signed_url: string;
    error_message: string | null;
}

export interface Citation {
    position: number;
    references: Array<{
        file: FileReference;
        pages: number[];
    }>;
}

export interface ChatResponse {
    finish_reason: string;
    message: ChatMessage;
    id: string;
    model: string;
    usage: TokenUsage;
    citations: Citation[];
}

export interface ChatRequest {
    messages: ChatMessage[];
    stream: boolean;
    model: string;
}
