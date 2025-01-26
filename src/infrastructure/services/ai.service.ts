// ./ai.service.ts

import { Injectable } from '@nestjs/common';
import { AIDefaultStrategy } from '../../application/ai-strategies/ai-default.strategy';
import { IAIService } from '../../application/interfaces/ai-strategy.interface';


@Injectable()
export class AIService {
    private aiStrategy: IAIService;

    constructor() {
        this.aiStrategy = new AIDefaultStrategy();
    }

    setStrategy(strategy: IAIService) {
        this.aiStrategy = strategy;
    }

    async generateSuggestion(reservationData: any) {
        return await this.aiStrategy.generateSuggestion(reservationData);
    }
}
