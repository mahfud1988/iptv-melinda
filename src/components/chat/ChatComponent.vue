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
import { onMounted } from 'vue';
import { Send, Pause } from "lucide-vue-next";
import { useChatLogic } from '@/composables/useChatLogic';

const {
	botSeed,
    conversation,
    userMessage,
	chatBox,
    isWaiting,
    isTyping,
    isPaused,
	scrollToBottom,
    sendMessage,
	formatMessage,
    stopMessage,
} = useChatLogic();

onMounted(() => {
	// console.log(botSeed);
	conversation.value.push(botSeed.value);
	conversation.value.push({ role: 'assistant', content: 'Halo, saya Eresia, Asisten AI Melinda Hospital. Ada yang bisa dibantu?' });
	scrollToBottom();
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
