
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  // Use process.env.API_KEY directly as per guidelines to avoid fallback logic
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const editImageWithGemini = async (
  imageBase64: string,
  mimeType: string,
  prompt: string
): Promise<string | null> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBase64.split(',')[1], // Strip metadata prefix if present
              mimeType: mimeType,
            },
          },
          {
            text: `Carefully edit this image according to the following instruction: ${prompt}. Return ONLY the edited image.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Editing Error:", error);
    throw error;
  }
};
