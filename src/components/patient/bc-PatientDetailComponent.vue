<template>
    <div class="patient-detail">
      <h1 class="title">Data Pasien</h1>
  
      <!-- Menampilkan loading atau pesan jika data belum siap -->
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">Terjadi kesalahan saat memuat data pasien.</div>
      <div v-else>
        <div class="patient-info card">
          <h2>{{ patient.name }}</h2>
          <p><strong>Usia:</strong> {{ patient.age }} tahun</p>
          <p><strong>Penyakit:</strong> {{ patient.disease }}</p>
          <p><strong>Ruangan:</strong> {{ patient.room }}</p>
          <p><strong>Dokter:</strong> {{ patient.doctor }}</p>
          <p><strong>Perawat:</strong> {{ patient.nurse }}</p>
        </div>
  
        <div class="disease-description card">
          <h3>Uraian Penyakit:</h3>
          <div class="disease-text" v-html="formatMessage(diseaseDescription)">
          </div>
        </div>
      </div>
      
      <!-- Icon chat floating di kanan bawah -->
      <div class="chat-icon" @click="goToChat">
        <i class="fas fa-comments"></i>
      </div>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';  // Untuk akses parameter route
    import { usePatientStore } from '@/stores/patient';
    import generateDiseaseDescription from '@/composables/generateDiseaseDescription';
    import { marked } from 'marked';
    import DOMPurify from 'dompurify';

    const diseaseDescription = ref('Memuat deskripsi...');

    // Mengambil parameter route
    const route = useRoute();
    const patientId = parseInt(route.params.patientId);  // Ambil patientId dari URL
    const router = useRouter();  // Akses router untuk navigasi
  
    // Mengakses store Pinia
    const store = usePatientStore();
  
    // State untuk menangani loading dan error
    const loading = ref(true);
    const error = ref(false);
  
    // Menyimpan data pasien berdasarkan patientId
    const patient = ref(null);
  
    // Fungsi untuk mengambil data pasien
    const fetchPatientData = async () => {
      try {
        patient.value = store.getPatientById(patientId);
        if (patient.value) {
          diseaseDescription.value = await generateDiseaseDescription(patient.value.disease);
        } else {
          throw new Error("Data pasien tidak ditemukan");
        }
      } catch (err) {
        error.value = true;
        console.error(err);
      } finally {
        loading.value = false;
      }
    };
    const formatMessage = (content) => {
        return DOMPurify.sanitize(marked(content));
    };
  
    onMounted(() => {
      fetchPatientData();
    });
  
    // Fungsi untuk mengarahkan ke halaman chat
    const goToChat = () => {
      router.push(`/chat/${patientId}`);
    };
  </script>
  
  <style scoped>
    /* Styling keseluruhan */
    .patient-detail {
      padding: 20px;
      background-color: #f4f7f6;
      font-family: 'Arial', sans-serif;
    }
  
    .title {
      text-align: center;
      color: #2c3e50;
      font-size: 32px;
      margin-bottom: 30px;
    }
  
    .loading, .error {
      text-align: center;
      font-size: 20px;
    }
  
    .loading {
      color: #e67e22;
    }
  
    .error {
      color: #e74c3c;
    }
  
    .card {
      background: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }
  
    .card h2 {
      color: #34495e;
      font-size: 24px;
      margin-bottom: 10px;
    }
  
    .card p {
      font-size: 16px;
      color: #7f8c8d;
    }
    .patient-info{
      max-width: 500px;
    }
  
    .disease-description {
      background-color: #ecf0f1;
      padding: 20px;
      border-radius: 8px;
      margin-top: 30px;
    }
    .disease-text{
      display: flex;
      flex-direction: column;
      align-self: start;
    }
  
    .disease-text p {
      font-size: 18px;
      color: #2c3e50;
      text-align: left;
      font-style: normal;
      margin-bottom: 10px;
    }
  
    /* Styling untuk chat icon */
    .chat-icon {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #3498db;
      color: white;
      border-radius: 50%;
      padding: 15px;
      font-size: 24px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      z-index: 1000;
    }
  
    .chat-icon:hover {
      background-color: #2980b9;
    }
  </style>
  