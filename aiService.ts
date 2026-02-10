
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const aiService = {
  generateEmotionalMessage: async (name: string, stars: number, starsNeeded: number, nextReward: string) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Crie uma mensagem motivacional curta para ${name} que tem ${stars} estrelas e precisa de ${starsNeeded} para ${nextReward}. Use emojis.`
      });
      return response.text;
    } catch (e) {
      return "Continue brilhando! Você está no caminho certo. ✨";
    }
  },

  speakMessage: async (text: string) => {
    // Implementação básica de voz se necessário
    console.log("Falando:", text);
  }
};
