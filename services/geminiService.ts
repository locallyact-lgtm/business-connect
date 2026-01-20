
import { GoogleGenAI } from "@google/genai";

export const generateHeaderImage = async (): Promise<string | null> => {
  // If no API key is provided (common in non-dev WordPress environments), 
  // we exit early to allow the app to use a static fallback.
  if (!process.env.API_KEY || process.env.API_KEY === "undefined") {
    console.info("Gemini API Key not found. Using static community header.");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `A dynamic and engaging collage representing a diverse range of local businesses in Edgewater, Maryland. 
    Include high-quality visual icons and elements like a gym, electrical contractor, massage therapy, lawn care service, 
    HVAC contractor, barber shop, restaurant, automotive service, nail salon, dentist office, house cleaning service, and hair salon. 
    Use a vibrant color palette (blues, oranges, greens) and a modern grid/collage layout. 
    Create a sense of local community, warmth, and professional support for small businesses. 
    Background should feel bright and inviting for a website header.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating header image:", error);
    return null;
  }
};
