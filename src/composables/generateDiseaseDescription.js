import axios from 'axios';

const API_URL = 'https://api.mistral.ai/v1/chat/completions';
const API_KEY = process.env.VUE_APP_MISTRAL_API_KEY;

async function generateDiseaseDescription(diseaseName) {
    // console.log('generate......');
    try {
        const conversation = [
            { role: 'system', content: 'Anda adalah asisten medis yang memberikan deskripsi singkat tetapi informatif tentang penyakit.' },
            { role: 'user', content: `Jelaskan secara ringkas tentang penyakit ${diseaseName}. Uraikan Gejala, Penyebab, Makanan yang dibolehkan dan dilarang, dan Pengobatan jika ada!` }
        ];

        const response = await axios.post(
            API_URL,
            {
                model: 'mistral-large-latest',
                messages: conversation,
                temperature: 0.7,
                max_tokens: 1000
            },
            {
                headers: { 'Authorization': `Bearer ${API_KEY}` }
            }
        );
        console.log(response);

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error generating disease description:', error);
        return 'Deskripsi tidak tersedia.';
    }
}

export default generateDiseaseDescription;