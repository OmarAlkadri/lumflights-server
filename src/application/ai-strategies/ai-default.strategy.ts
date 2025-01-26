import { Injectable } from '@nestjs/common';
import { IAIService, IAIResponse } from '../interfaces/ai-strategy.interface';
import { CohereClientV2 } from 'cohere-ai';
import { config } from 'dotenv';

config();

@Injectable()
export class AIDefaultStrategy implements IAIService {
    private cohereClient: CohereClientV2;

    private readonly textAnalysisModelId = 'command-xlarge-nightly';
    private readonly defaultLanguage = 'en';

    constructor() {
        this.cohereClient = new CohereClientV2({
            token: process.env.COHERE_API_KEY || '',
        });
    }

    /**
     * Generate suggestions based on Flight Reservation data
     * @param ReservationData Reservation data
     */
    async generateSuggestion(ReservationData: any): Promise<IAIResponse> {
        try {
            const [textAnalysis, commentsAnalysis, flightSuggestions] = await Promise.all([
                this.analyzeText(ReservationData),
                this.analyzeComments(ReservationData.comments),
                this.analyzeFlightData(ReservationData.fromWhereLocation, ReservationData.toWhereLocation),
            ]);

            return {
                suggestion: textAnalysis,
                comments: commentsAnalysis,
                weather: 'Not implemented', // Placeholder for weather integration
                tourism: flightSuggestions,
            };
        } catch (error) {
            console.error('Error in generateSuggestion:', error);
            throw new Error('Bir hata oluştu ve öneriler oluşturulamadı.');
        }
    }

    /**
     * Generic request to Cohere API
     */
    private async sendCohereRequest(prompt: string): Promise<string> {
        try {
            const response = await this.cohereClient.chat({
                model: this.textAnalysisModelId,
                messages: [{ role: 'user', content: prompt }],
            });

            return response.message.content?.[0]?.text || 'Cevap mevcut değil.';
        } catch (error: any) {
            console.error('Cohere isteğinde hata oluştu:', error.response?.data || error.message);
            throw new Error(`İstek işlenirken bir hata oluştu: ${error.message}`);
        }
    }

    private async analyzeText(ReservationData: any): Promise<string> {
        const prompt = `
            You have a flight reservation with the following details:
            - Flight Number: ${ReservationData.flightNumber}
            - From: ${ReservationData.fromWhereLocation}
            - To: ${ReservationData.toWhereLocation}
            - Airline: ${ReservationData.flightCompaniName}
            - Reservation Date: ${ReservationData.reservationDate}

            Please provide insights in Turkish on:
            1. Best times to book similar flights.
            2. Recommendations for avoiding delays.
            3. Suggested ways to improve the travel experience.
            4. Summarize the text and give me only the answers in the form “1. 2. 3.”.
        `;
        return await this.sendCohereRequest(prompt);
    }

    private async analyzeComments(comments: any[]): Promise<any> {
        const analysis = {
            oneStar: [],
            twoStars: [],
            threeStars: [],
            fourStars: [],
            fiveStars: [],
        };

        await Promise.all(
            comments.map(async (comment) => {
                const prompt = `
                    Analyze the sentiment of this review in Turkish: 
                    "${comment.text}"
                    
                    The review has a star rating of ${comment.rating} out of 5. 
                    Please consider this rating while analyzing the sentiment.
                `;
                const sentiment = await this.sendCohereRequest(prompt);
                const mockRating = comment.rating;
                if (mockRating === 1) {
                    analysis.oneStar.push({ text: comment.text, sentiment, rating: mockRating });
                } else if (mockRating === 2) {
                    analysis.twoStars.push({ text: comment.text, sentiment, rating: mockRating });
                } else if (mockRating === 3) {
                    analysis.threeStars.push({ text: comment.text, sentiment, rating: mockRating });
                } else if (mockRating === 4) {
                    analysis.fourStars.push({ text: comment.text, sentiment, rating: mockRating });
                } else if (mockRating === 5) {
                    analysis.fiveStars.push({ text: comment.text, sentiment, rating: mockRating });
                }
            })
        );

        return analysis;
    }

    private async analyzeFlightData(from: string, to: string): Promise<string[]> {
        const prompt = `
            Based on the flight route from "${from}" to "${to}", list some tips for travelers on this route.
            Provide the response in a numbered list in Turkish.
        `;
        const response = await this.sendCohereRequest(prompt);
        return response.split('\n').filter((line) => line.trim() !== '');
    }
}
