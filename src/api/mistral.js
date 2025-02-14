import axios from "axios";

const API_URL = "https://api.mistral.ai/v1/chat/completions";
const API_KEY = "YOUR_MISTRAL_API_KEY"; // Ganti dengan API Key Mistral

export const sendMessageToMistral = async (messages) => {
    try {
        const response = await axios.post(
            API_URL,
            {
                model: "mistral-large", // Sesuaikan dengan model yang diinginkan
                messages: messages,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error sending message:", error);
        return "Maaf, terjadi kesalahan. Silakan coba lagi.";
    }
};
