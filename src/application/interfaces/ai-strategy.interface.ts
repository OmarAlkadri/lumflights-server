// src/application/interfaces/ai-strategy.interface.ts

export interface IAIResponse {
    suggestion: string;
    comments: string[];
    weather?: any;
    tourism?: any;
}

export interface IAIService {
    generateSuggestion(reservationData: any): Promise<IAIResponse>;
}
