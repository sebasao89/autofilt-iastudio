import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private genAI: GoogleGenAI;

  constructor() {
    this.genAI = new GoogleGenAI({ apiKey: environment.geminiApiKey });
  }

  async chat(message: string, history: any[] = [], lang: 'es' | 'en' = 'es') {
    try {
      const systemInstruction = `You are 'Autolift AI', an expert wellness coach specializing in lymphatic drainage, metabolic health, and body contouring. Your tone is professional, encouraging, and scientifically grounded but accessible. Keep answers concise and helpful. Respond in ${lang === 'es' ? 'Spanish' : 'English'}.`;

      const response = await this.genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            ...history, 
            { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: systemInstruction
        }
      });
      return response.text;
    } catch (e) {
      console.error('AI Error', e);
      return lang === 'es' ? "Tengo problemas para conectar con el servidor de bienestar. Por favor intenta de nuevo." : "I'm having trouble connecting to the wellness server. Please try again.";
    }
  }

  async analyzeImage(base64Image: string, prompt: string) {
    try {
      const response = await this.genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
            { text: prompt }
          ]
        },
        config: {
          systemInstruction: "You are a body composition and wellness expert. Analyze images for fitness progress, posture, and wellness indicators. Be encouraging and focus on health, vitality, and structural improvements. Do not give medical diagnoses."
        }
      });
      return response.text;
    } catch (e) {
      console.error('Image Analysis Error', e);
      return "Unable to analyze the image at this time.";
    }
  }
}
