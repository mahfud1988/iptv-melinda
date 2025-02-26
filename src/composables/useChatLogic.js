import { ref, nextTick } from "vue";
import axios from 'axios';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { cleanHTML } from '@/functions/general';

export function useChatLogic() {
    const botSeed = ref(
        { 
            role: 'system', 
            content: 'Selamat Datang! saya Eresia akan membantu anda. Saya adalah Asisten AI Melinda Hospital. Saya akan menjawab dengan bahasa indonesia yang alami. Saya akan menggunakan saya, bukan aku, kecuali diperintahkan user. Saya akan menjawab dengan ringkas dan jelas, jika saya perlu bertanya balik juga begitu. Saya tidak akan mengucap salam karena sudah ada di awal percakapan. Saya tidak akan melayani tugas di luar tugas saya sebagai Asisten Rumah Sakit. Pengetahuan dasar saya: bagian dari Melinda Hospital Group [RSIA Melinda (Rumah Sakit Ibu dan Anak, Alamat di Jl. Pajajaran 46, Didirikan pada tahun 2004 oleh dr. Susan Melinda SPOG, seorang dokter kandungan), Rumah Sakit Melinda 2 (Alamat di Jl. Dr. Cipto 1), Melinda Cardio Vascular Center (Alamatnya di Jl. Dr. Cipto 11)] semua Rumah Sakit tersebut berlokasi di Kota Bandung. ' 
        }
    );
    const conversation = ref([]);
    const userMessage = ref('');
    const chatBox = ref(null);
    const isWaiting = ref(false);
    const isTyping = ref(false);
    const isPaused = ref(false);

    let counter = 0;

    const scrollToBottom = () => {
        nextTick(() => {
            if (chatBox.value) {
                chatBox.value.scrollTop = chatBox.value.scrollHeight;
            }
        });
    };

    const typeMessage = async (text) => {
        let typedText = "";
        for (let i = 0; i < text.length; i++) {
            if(isPaused.value){
                conversation.value[conversation.value.length - 1].content = cleanHTML(conversation.value[conversation.value.length - 1].content);
                console.log(conversation.value[conversation.value.length - 1]);
                break;
            }
            typedText += text[i];
            conversation.value[conversation.value.length - 1].content = typedText + (i < (text.length - 1) ? typeChar(15) : '');
            await new Promise((resolve) => setTimeout(resolve, 30)); // Kecepatan efek
            if(((chatBox.value.scrollTop + chatBox.value.clientHeight) + (chatBox.value.clientHeight < 200 ? 50 : 75)) >= (chatBox.value.scrollHeight)){
                scrollToBottom();
            }
        }
        isTyping.value = false;
    };

    const sendMessage = async () => {
        if (userMessage.value.trim() && (!isWaiting.value && !isTyping.value)) {
            conversation.value.push({ role: 'user', content: userMessage.value });
            userMessage.value = '';
            isWaiting.value = true;
            isTyping.value = true;
            isPaused.value = false;
            scrollToBottom();
    
            try {
                const response = await axios.post(
                'https://api.mistral.ai/v1/chat/completions',
                {
                    model: 'mistral-large-latest',
                    messages: cleanConversation(conversation.value),
                    temperature: 0.7,
                    max_tokens: 1000
                },
                {
                    headers: { 'Authorization': `Bearer ${process.env.VUE_APP_MISTRAL_API_KEY}` }
                }
                );
    
                const assistantResponse = response.data.choices[0].message.content;
                conversation.value.push({ role: 'assistant', content: "" }); // Awal teks kosong
                isWaiting.value = false;
                await typeMessage(assistantResponse);
            } catch (error) {
                console.error('Error sending message:', error);
                conversation.value.push({ role: 'assistant', content: 'Maaf, terjadi kesalahan.' });
                isTyping.value = false;
            }
        }
    };

    const formatMessage = (content) => {
        return DOMPurify.sanitize(marked(content));
    };

    function typeChar(n) {
        counter++;
        if (counter === n) {
            counter = 0;
            return '_<span class="typing-indicator" style="font-size: 10px; padding: 5px; border-radius: 0; background: #000;"></span>';
        }
        return '_';
    }
    function stopMessage(){
        isPaused.value = true;
    }
    function cleanConversation(cv){
        const cleaned = [];
        for(let i = 0; i < cv.length; i++){
            if(cv[i].content != ''){
                cleaned.push(
                    {
                        role: cv[i].role,
                        content: cv[i].content
                    }
                );
            }else{
                cleaned.pop();
            }
        }
        return cleaned;
    }

    return {
        botSeed,
        conversation,
        userMessage,
        chatBox,
        isWaiting,
        isTyping,
        isPaused,
        typeMessage,
        scrollToBottom,
        sendMessage,
        stopMessage,
        formatMessage,
    };
}
