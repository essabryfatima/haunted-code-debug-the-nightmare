
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating response from Gemini:", error);
    return "The connection to the spirit world has been severed. The entities are silent... for now. (Check your API key and network connection).";
  }
};
