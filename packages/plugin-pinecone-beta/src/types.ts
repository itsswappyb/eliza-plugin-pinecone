// add CreateAgentResponse and UploadFileResponse types
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