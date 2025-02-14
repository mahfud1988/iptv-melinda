<template>
  <PatientDetailComponent/>
</template>

<script setup>
  import PatientDetailComponent from '../components/patient/PatientDetailComponent.vue';
  import { onMounted } from 'vue';
  import { setPageData } from '@/functions/general';
  onMounted(() => {
    setPageData({
            title: 'Data Pasien',
            description: 'Halaman Data Pasien',
        });
  });
</script>
  