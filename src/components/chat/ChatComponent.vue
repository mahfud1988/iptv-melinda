<template>
	<section>
	<div class="section-inner">
		<div class="chat-container">
		<div class="chat-box" ref="chatBox">
			<!-- <div 
				v-for="(message, index) in conversation" 
				:key="index" 
				ref="messages"
				>
				<div 
				v-if="index > 0"
				:class="['message', message.role]"
					>
					<p>{{ message.content }}</p>
				</div>
			</div> -->
			<template 
			v-for="(message, index) in conversation" 
			:key="index" 
			
			>
				<!-- <div 
					v-if="!(message.role === 'system' && index === 0)"
					:class="['message', message.role]"
				>
					<p>{{ message.content }}</p>
				</div> -->
				<div 
					v-if="!(message.role === 'system' && index === 0)"
					:class="['message', message.role]"
					v-html="formatMessage(message.content)"
				></div>
			</template>
			<div v-if="isTyping" class="typing-indicator">
				<span>Bot sedang mengetik...</span>
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
			<button @click="sendMessage" class="send-button">Kirim</button>
		</div>
		</div>
	</div>
	</section>
</template>
  
<script setup>
// import { ref, onMounted, nextTick } from 'vue';
// import axios from 'axios';

// export default {
// setup() {
// 	const conversation = ref([]);
// 	const userMessage = ref('');
// 	const chatBox = ref(null);
// 	const isTyping = ref(false);

// 	// Fungsi untuk scroll ke bawah
// 	const scrollToBottom = () => {
// 	nextTick(() => {
// 		if (chatBox.value) {
// 		chatBox.value.scrollTop = chatBox.value.scrollHeight;
// 		}
// 	});
// 	};

// 	const sendMessage = async () => {
// 	if (userMessage.value.trim()) {
// 		conversation.value.push({ role: 'user', content: userMessage.value });
// 		userMessage.value = '';
// 		isTyping.value = true;
// 		scrollToBottom();

// 		try {
// 		const response = await axios.post(
// 			'https://api.mistral.ai/v1/chat/completions', 
// 			{
// 			model: 'codestral-2405',
// 			messages: conversation.value,
// 			temperature: 0.7,
// 			max_tokens: 200
// 			},
// 			{
// 			headers: { 'Authorization': `Bearer ${process.env.VUE_APP_MISTRAL_API_KEY}` }
// 			}
// 		);

// 		const assistantResponse = response.data.choices[0].message.content;
// 		conversation.value.push({ role: 'assistant', content: assistantResponse });
// 		// userMessage.value = '';
// 		isTyping.value = false;
// 		scrollToBottom();
// 		} catch (error) {
// 		console.error('Error sending message:', error);
// 		}
// 	}
// 	};

// 	onMounted(() => {
// 	conversation.value.push({ role: 'system', content: 'Selamat Datang! saya Eresia akan membantu anda. Saya adalah Asisten AI Melinda Hospital. Saya akan menjawab dengan bahasa indonesia yang alami. Saya akan menjawab dengan ringkas dan jelas, jika saya perlu bertanya balik juga begitu. Saya tidak akan mengucap salam karena sudah ada di awal percakapan.' });
// 	scrollToBottom();  // Scroll ke bawah saat pertama kali halaman dimuat
// 	});

// 	return { conversation, userMessage, sendMessage, chatBox, isTyping };
// }
// };

import { ref, onMounted, nextTick } from 'vue';
import axios from 'axios';
import { marked } from 'marked';

const conversation = ref([]);
const userMessage = ref('');
const chatBox = ref(null);
const isTyping = ref(false);

// Fungsi untuk scroll ke bawah
const scrollToBottom = () => {
  nextTick(() => {
    if (chatBox.value) {
      chatBox.value.scrollTop = chatBox.value.scrollHeight;
    }
  });
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
      conversation.value.push({ role: 'assistant', content: assistantResponse });
      isTyping.value = false;
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
};

const formatMessage = (content) => {
  return marked(content);
};

onMounted(() => {
  conversation.value.push({ role: 'system', content: 'Selamat Datang! saya Eresia akan membantu anda. Saya adalah Asisten AI Melinda Hospital. Saya akan menjawab dengan bahasa indonesia yang alami. Saya akan menjawab dengan ringkas dan jelas, jika saya perlu bertanya balik juga begitu. Saya tidak akan mengucap salam karena sudah ada di awal percakapan. Saya tidak akan melayani tugas di luar tugas saya sebagai Asisten Rumah Sakit. Pengetahuan dasar saya: bagian dari Melinda Hospital Group [RSIA Melinda (Rumah Sakit Ibu dan Anak, Alamat di Jl. Pajajaran 46, Didirikan pada tahun 2004 oleh dr. Susan Melinda SPOG, seorang dokter kandungan), Rumah Sakit Melinda 2 (Alamat di Jl. Dr. Cipto 1), Melinda Cardio Vascular Center (Alamatnya di Jl. Dr. Cipto 11)] semua Rumah Sakit tersebut berlokasi di Kota Bandung, dokter disingkat dr. doktor disingkat Dr. ' });
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
		padding: 50px;
	}
	.chat-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 600px;
		height: 80vh;
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
		/* overflow-y: auto; */
		justify-content: start;
		text-align: left;
	}
	.message p{
		margin: 0;
	}

	.message.user {
		align-self: flex-end;
		background-color: #5c9ded;
		color: white;
	}

	.message.assistant {
		align-self: flex-start;
		background-color: #ddd;
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

	.chat-input:focus {
		border-color: #5c9ded;
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

	.send-button:hover {
		background-color: #4785bb;
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
</style>
