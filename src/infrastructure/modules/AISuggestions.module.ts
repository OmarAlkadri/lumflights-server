import { Module } from '@nestjs/common';
import { FirebaseModule } from '../database/firestore/firestore.module';
import { AIService } from '../services/ai.service';
import { AIDefaultStrategy } from 'src/application/ai-strategies/ai-default.strategy';
import { AIAdvancedStrategy } from 'src/application/ai-strategies/ai-advanced.strategy';
@Module({
    imports: [FirebaseModule],
    controllers: [],
    providers: [AIService, AIDefaultStrategy, AIAdvancedStrategy],
    exports: [AIService],


})
export class AISuggestionsModule { }
