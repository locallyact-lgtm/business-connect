
import { GoogleGenAI } from "@google/genai";

export const generateHeaderImage = async (): Promise<string | null> => {
  // Safe check for process.env to avoid ReferenceError in browser environments
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;

  if (!apiKey || apiKey === "undefined") {
    console.info("Gemini API Key not found. Using static community header.");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `A professional, high-resolution hero image for a local business directory in Edgewater, Maryland. 
    The composition should be a wide-angle, photorealistic view of a vibrant, sun-drenched coastal community business district. 
    It should feature modern storefronts representing a diverse range of local commerce: a boutique fitness studio, 
    a charming waterfront restaurant with outdoor seating, a professional service vehicle for a local contractor, and an upscale hair salon. 
    The atmosphere is welcoming, prosperous, and trustworthy, with hints of the Chesapeake Bay shoreline in the background. 
    Use a palette of navy blues, warm golds, and lush Maryland greenery. Architectural photography style, high-end commercial aesthetic, 16:9 aspect ratio, no text.`;

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

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating header image:", error);
    return null;
  }
};
