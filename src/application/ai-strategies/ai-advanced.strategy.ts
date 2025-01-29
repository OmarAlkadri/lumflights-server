// src/application/ai-strategies/ai-advanced.strategy.ts

import { IAIService, IAIResponse } from '../interfaces/ai-strategy.interface';

export class AIAdvancedStrategy implements IAIService {
    async generateSuggestion(): Promise<IAIResponse> {

        return { suggestion: '', comments: [''] };
    }
}
