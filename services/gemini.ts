
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getPricingIntelligence = async (product: Product) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this product for pricing optimization:
      Product: ${product.title}
      Category: ${product.category}
      Current Price: $${product.price}
      Cost: $${product.cost}
      Inventory: ${product.inventoryQuantity}
      
      Suggest an optimal price and give 3 bullet points of reasoning. Return as JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestedPrice: { type: Type.NUMBER },
          reasoning: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["suggestedPrice", "reasoning"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const getBusinessInsights = async (salesData: any[]) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on this week's sales data: ${JSON.stringify(salesData)}. Provide a brief summary of performance and one actionable growth strategy for a Shopify merchant.`,
  });
  return response.text;
};

export const generateWorkflowSuggestion = async (painPoint: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `User pain point: "${painPoint}". 
    Propose an automated Shopify workflow (Trigger -> Action) to solve this.`,
  });
  return response.text;
};
