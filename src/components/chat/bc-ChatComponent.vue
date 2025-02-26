<template>
	<section>
		<div class="section-inner">
			<div class="chat-container">
				<div class="chat-box" ref="chatBox">
					<template 
					v-for="(message, index) in conversation" 
					:key="index" 
					
					>
						<div 
							v-if="!(message.role === 'system')"
							:class="['message', message.role]"
							v-html="formatMessage(message.content)"
						></div>
					</template>
					<div v-if="isWaiting && !isPaused" class="typing-indicator">
					</div>
				</div>
			
				<div class="input-container">
					<input 
					v-model="userMessage" 
					@keyup.enter="sendMessage" 
					type="text" 
					placeholder="Ketik pesan..." 
					class="chat-input"
					/>
					<button @click="sendMessage" class="send-button" v-if="!isTyping">
						<Send size="20" stroke-width="2" />
					</button>
					<button @click="stopMessage" class="pause-button" v-else-if="isTyping && !isPaused">
						<Pause size="20" stroke-width="2" />
					</button>
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
import { Send, Pause } from "lucide-vue-next";
import { cleanHTML } from '@/functions/general';

const conversation = ref([]);
const userMessage = ref('');
const chatBox = ref(null);
const isWaiting = ref(false);
const isTyping = ref(false);
const isPaused = ref(false);

let counter = 0;

// Fungsi untuk scroll ke bawah
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
		// console.log(text[i]);
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
        counter = 0;  // Reset counter setelah 5 input
		return '_<span class="typing-indicator" style="font-size: 10px; padding: 5px; border-radius: 0; background: #000;"></span>';
    }
	return '';
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
	// console.log(cleaned);
	return cleaned;
}

onMounted(() => {
	conversation.value.push({ role: 'system', content: 'Selamat Datang! saya Eresia akan membantu anda. Saya adalah Asisten AI Melinda Hospital. Saya akan menjawab dengan bahasa indonesia yang alami. Saya akan menggunakan saya, bukan aku, kecuali diperintahkan user. Saya akan menjawab dengan ringkas dan jelas, jika saya perlu bertanya balik juga begitu. Saya tidak akan mengucap salam karena sudah ada di awal percakapan. Saya tidak akan melayani tugas di luar tugas saya sebagai Asisten Rumah Sakit. Pengetahuan dasar saya: bagian dari Melinda Hospital Group [RSIA Melinda (Rumah Sakit Ibu dan Anak, Alamat di Jl. Pajajaran 46, Didirikan pada tahun 2004 oleh dr. Susan Melinda SPOG, seorang dokter kandungan), Rumah Sakit Melinda 2 (Alamat di Jl. Dr. Cipto 1), Melinda Cardio Vascular Center (Alamatnya di Jl. Dr. Cipto 11)] semua Rumah Sakit tersebut berlokasi di Kota Bandung, dokter disingkat dr. doktor disingkat Dr. (jangan sampai salah tentang penulisan dr.) ' });
	conversation.value.push({ role: 'assistant', content: 'Halo, saya Eresia, Asisten AI Melinda Hospital. Ada yang bisa dibantu?' });
	scrollToBottom();  // Scroll ke bawah saat pertama kali halaman dimuat
});
</script>
  
<style scoped>
	section{
		position: relative;
		width: 100%;
		height: 100vh;
	}
	.section-inner{
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
		display: inline;
		margin-bottom: 10px;
		padding: 10px;
		border-radius: 10px;
		min-width: 100px;
		max-width: 100%;
		justify-content: start;
		text-align: left;
	}
	.message p{
		margin: 0;
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
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
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

	.chat-input:focus {
		border-color: #5c9ded;
	}

	.send-button {
		display: flex;
		align-items: center;
		background-color: none;
		color: #5c9ded;
		padding: 10px 15px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: 14px;
		margin-left: 10px;
	}

	.send-button:hover {
		background-color: #c2c2c2;
	}
	.pause-button {
		background-color: #474747;
		color: white;
		padding: 10px 15px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: 14px;
		margin-left: 10px;
	}

	.pause-button:hover {
		background-color: #5f5f5f;
	}

	.chat-box::-webkit-scrollbar {
		width: 8px;
	}

	.chat-box::-webkit-scrollbar-thumb {
		background-color: #888;
		border-radius: 5px;
	}

	.chat-box::-webkit-scrollbar-thumb:hover {
		background-color: #555;
	}
	.typing-indicator {
		display: flex;
		align-items: center;
		padding: 5px;
		color: #999;
		font-style: italic;
	}
	.typing-indicator span {
		animation: typing 1.5s infinite;
	}

	@keyframes typing {
		0% { content: '.'; }
		33% { content: '..'; }
		66% { content: '...'; }
	}
	.typing-indicator {
		display: flex;
		align-items: center;
		padding: 5px;
		color: #999;
		font-style: italic;
	}

	.typing-indicator::after {
		content: " ";
		display: inline-block;
		width: 5px;
		height: 15px;
		background-color: #999;
		margin-left: 5px;
		animation: blink 1s infinite;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	@media (max-width: 767px){
		.section-inner{
			padding: 0;
		}
	}
</style>
