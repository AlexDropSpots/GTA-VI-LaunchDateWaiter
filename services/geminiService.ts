import { GoogleGenAI, Type } from "@google/genai";
import { NewsHeadline } from "../types";

// Initialize Gemini Client
// Note: We use process.env.API_KEY directly as per strict guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLeonidaNews = async (): Promise<NewsHeadline[]> => {
  try {
    const model = "gemini-2.5-flash";
    const schema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          headline: {
            type: Type.STRING,
            description: "A short, satirical news headline fitting for GTA 6.",
          },
          category: {
            type: Type.STRING,
            description: "The category of the news (e.g., CRIME, POLITICS, GATORS, FLORIDA MAN).",
          },
        },
        required: ["headline", "category"],
      },
    };

    const response = await ai.models.generateContent({
      model: model,
      contents: "Generate 3 funny, satirical, and chaotic news headlines set in the fictional state of Leonida (Vice City / Florida parody). Think 'Florida Man' energy, alligators, absurd crimes, and tropical chaos. Keep it short and punchy.",
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: "You are a satirical news generator for the Grand Theft Auto VI universe. You output JSON only.",
        temperature: 0.9,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as NewsHeadline[];
    }
    throw new Error("No text response from Gemini");
  } catch (error) {
    console.error("Failed to generate news:", error);
    // Fallback data in case of API failure or missing key
    return [
      { headline: "Local Gator Arrested for Loitering at Convenience Store", category: "WILDLIFE" },
      { headline: "Man Tries to Rob Bank with a Banana, Leaves with Loan", category: "CRIME" },
      { headline: "Traffic Jam on Vice City Bridge Caused by Twerking Contest", category: "TRAFFIC" },
    ];
  }
};