// src/application/ai-strategies/ai-advanced.strategy.ts

import { IAIService, IAIResponse } from '../interfaces/ai-strategy.interface';

export class AIAdvancedStrategy implements IAIService {
    async generateSuggestion(ReservationsData: any): Promise<IAIResponse> {

        return { suggestion: '', comments: [''] };
    }
}
