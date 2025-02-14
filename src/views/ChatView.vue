<template>
	<ChatComponent/>
</template>

<script setup>
	import ChatComponent from '../components/chat/ChatComponent.vue';
	import { onMounted } from 'vue';
	import { setPageData } from '@/functions/general';
	onMounted(() => {
	setPageData({
			title: 'Chat Eresia',
			description: 'Halaman Chat dengan Eresia',
		});
	});
</script>
