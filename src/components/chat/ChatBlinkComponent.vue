<template>
    <section>
        <div class="section-inner">
            <div class="chat-container">
                <div class="chat-box" ref="chatBox">
                    <template v-for="(message, index) in conversation" :key="index">
                        <div 
                            v-if="message.role !== 'system'"
                            :class="['message', message.role]"
                        >
                            <span v-if="message.role === 'assistant' && isTyping && index === conversation.length - 1" class="typing-indicator"></span>
                            <span v-html="formatMessage(message.content)"></span>
                        </div>
                    </template>
                </div>
            
                <div class="input-container">
                    <input 
                        v-model="userMessage" 
                        @keyup.enter="sendMessage" 
                        type="text" 
                        placeholder="Ketik pesan..." 
                        class="chat-input"
                    />
                    <button @click="sendMessage" class="send-button" v-if="!isTyping">Kirim</button>
                    <button class="pause-button" disabled v-else>Mengetik...</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import axios from 'axios';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const conversation = ref([]);
const userMessage = ref('');
const chatBox = ref(null);
const isTyping = ref(false);

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
        typedText += text[i];
        conversation.value[conversation.value.length - 1].content = typedText;
        await new Promise(resolve => setTimeout(resolve, 30));
        scrollToBottom();
    }
    isTyping.value = false;
};

const sendMessage = async () => {
    if (userMessage.value.trim()) {
        conversation.value.push({ role: 'user', content: userMessage.value });
        userMessage.value = '';
        isTyping.value = true;
        scrollToBottom();

        try {
            const response = await axios.post(
                'https://api.mistral.ai/v1/chat/completions',
                {
                    model: 'mistral-large-latest',
                    messages: conversation.value,
                    temperature: 0.7,
                    max_tokens: 500
                },
                {
                    headers: { 'Authorization': `Bearer ${process.env.VUE_APP_MISTRAL_API_KEY}` }
                }
            );

            const assistantResponse = response.data.choices[0].message.content;
            conversation.value.push({ role: 'assistant', content: "" });
            await typeMessage(assistantResponse);
        } catch (error) {
            console.error('Error sending message:', error);
            conversation.value.push({ role: 'assistant', content: 'Maaf, terjadi kesalahan.' });
            isTyping.value = false;
        }
    }
};

// Memformat pesan dengan mengganti karakter '>' menjadi '&gt;' dan tetap menjaga format HTML
const formatMessage = (content) => {
    const safeContent = content.replace(/>/g, '&gt;');  // Mengganti '>' dengan entitas HTML
    return DOMPurify.sanitize(marked(safeContent));
};

onMounted(() => {
    conversation.value.push({ role: 'assistant', content: 'Halo, saya Eresia, Asisten AI Melinda Hospital. Ada yang bisa dibantu?' });
    scrollToBottom();
});
</script>

<style scoped>
section {
    position: relative;
    width: 100%;
    height: 100vh;
}
.section-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 5vh;
}
.chat-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    margin: 0 auto;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f7f7f7;
}

.chat-box {
    padding: 15px;
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.message {
    display: inline-block;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    min-width: 100px;
    max-width: 100%;
    text-align: left;
}

.message.user {
    align-self: flex-end;
    background-color: #ddd;
    color: #333;
}

.message.assistant {
    align-self: flex-start;
    background-color: unset;
    color: #333;
}

.input-container {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ddd;
    background-color: #fff;
    justify-content: space-between;
}

.chat-input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    outline: none;
}

.send-button {
    background-color: #5c9ded;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 10px;
}

.pause-button {
    background-color: #474747;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: not-allowed;
    font-size: 14px;
    margin-left: 10px;
}

.typing-indicator {
    width: 8px;
    height: 8px;
    background-color: #999;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
</style>
