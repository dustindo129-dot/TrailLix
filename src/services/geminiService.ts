// @ts-ignore - GoogleGenerativeAI types might not be available in development
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("EXPO_PUBLIC_GEMINI_API_KEY environment variable not set. Using mock responses for development.");
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;


export interface DisplayMessage {
    role: 'user' | 'model';
    text: string;
}

export interface ChatSession {
    sendMessage: (message: string) => Promise<{ text: string }>;
}

// Create a chat session
export const createChat = (): ChatSession => {
    if (!API_KEY || !genAI) {
        // Return a mock chat object for development
        return {
            sendMessage: async (message: string): Promise<{ text: string }> => {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
                
                // Generate mock response based on the input
                let mockResponse = "This is a mock response for development. ";
                
                if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
                    mockResponse = "Hello! I'm a mock AI assistant. How can I help you today?";
                } else if (message.toLowerCase().includes('prompt')) {
                    mockResponse = "Great question about prompting! In prompt engineering, you want to be clear, specific, and provide context. Here's a tip: start with your goal, add relevant context, and specify the format you want.";
                } else if (message.toLowerCase().includes('help')) {
                    mockResponse = "I'm here to help! You can ask me about:\n• Prompt engineering techniques\n• AI best practices\n• Writing effective prompts\n• General questions about AI\n\nWhat would you like to know?";
                } else {
                    mockResponse = `Thanks for your message: "${message}". This is a mock AI response for development purposes. In a real implementation, I would provide a helpful and relevant response based on your input.`;
                }
                
                return { text: mockResponse };
            }
        };
    }

    // Use real Gemini API
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const chat = model.startChat({
            history: [],
        });
        
        return {
            sendMessage: async (message: string) => {
                try {
                    const result = await chat.sendMessage(message);
                    const response = await result.response;
                    return { text: response.text() };
                } catch (error) {
                    console.error("Error sending message to Gemini:", error);
                    return { text: "I'm sorry, I'm having trouble responding right now. Please try again later." };
                }
            }
        };
    } catch (error) {
        console.error("Error creating Gemini chat:", error);
        // Fallback to mock if API fails
        return {
            sendMessage: async (message: string) => {
                await new Promise(resolve => setTimeout(resolve, 1000));
                return { text: "I'm currently in offline mode. This is a mock response for development purposes." };
            }
        };
    }
};

// Analyze image with text prompt
export const analyzeImage = async (prompt: string, base64ImageData: string, mimeType: string): Promise<string> => {
    if (!API_KEY || !genAI) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
        
        // Generate mock response for image analysis
        return `Mock Image Analysis Result:

I can see this is an image you've uploaded for analysis. Since this is a development mock, I can't actually see the image content, but here's what a real analysis might include:

**Visual Elements:**
• Objects, people, or scenes in the image
• Colors, lighting, and composition
• Text or symbols visible

**Context Analysis:**
• Setting and environment
• Actions or activities depicted
• Relationships between elements

**Your Question:** "${prompt}"

**Mock Response:** This appears to be a mock analysis response. In production, I would provide detailed insights about the actual image content based on your specific question.

For the best results, try asking specific questions like:
- "What objects do you see?"
- "Describe the setting"
- "What text is visible?"
- "What's happening in this image?"`;
    }

    try {
        // Use real Gemini Vision API
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        
        const imagePart = {
            inlineData: {
                data: base64ImageData,
                mimeType: mimeType,
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error analyzing image with Gemini:", error);
        throw new Error("An error occurred while analyzing the image. Please try again.");
    }
};
