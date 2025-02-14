<template>
	<HomeComponent/>
</template>

<script setup>
	import HomeComponent from '../components/home/HomeComponent.vue';
	import { onMounted } from 'vue';
	import { setPageData } from '@/functions/general';
	onMounted(() => {
	setPageData({
			title: 'IPTV Melinda Hospital',
			description: 'Halaman Utama IPTV Melinda Hospital',
		});
	});
</script>
