<template>
  <div class="patient-detail">
    <h1 class="title">Data Pasien</h1>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">Terjadi kesalahan saat memuat data pasien.</div>
    <div v-else>
      <!-- <div class="patient-info card">
        <h2>{{ patient.name }}</h2>
        <p><strong>Usia:</strong> {{ patient.age }} tahun</p>
        <p><strong>Penyakit:</strong> {{ patient.disease }}</p>
        <p><strong>Ruangan:</strong> {{ patient.room }}</p>
        <p><strong>Dokter:</strong> {{ patient.doctor }}</p>
        <p><strong>Perawat:</strong> {{ patient.nurse }}</p>
      </div> -->
      <div class="patient-info card">
        <h2>{{ patient.name }}</h2>
        <p><Calendar class="info-icon" /> <strong>Usia:</strong> {{ patient.age }} tahun</p>
        <p><Activity class="info-icon" /> <strong>Penyakit:</strong> {{ patient.disease }}</p>
        <p><BedDouble class="info-icon" /> <strong>Ruangan:</strong> {{ patient.room }}</p>
        <p><Stethoscope class="info-icon" /> <strong>Dokter:</strong> {{ patient.doctor }}</p>
        <p><UserCheck class="info-icon" /> <strong>Perawat:</strong> {{ patient.nurse }}</p>
      </div>

      <div class="disease-description card">
        <h3>Uraian Penyakit:</h3>
        <!-- <div class="disease-text" v-html="formatMessage(store.diseaseDescriptions[0])"></div> -->
         <!-- <div>{{ patient }}</div> -->
        <div class="disease-text" v-html="patient?.diseaseDescription?.[0] ? formatMessage(patient.diseaseDescription[0]) : 'Tidak ada deskripsi penyakit.'"></div>

      </div>
      <button class="chat-button" @click="goToChatAI">
        <BotIcon class="icon" /> Chat dengan AI
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePatientStore } from '@/stores/patient';
import generateDiseaseDescription from '@/composables/generateDiseaseDescription';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { Bot as BotIcon, Calendar, Activity, BedDouble, Stethoscope, UserCheck } from 'lucide-vue-next';

const route = useRoute();
const patientId = parseInt(route.params.patientId);
const router = useRouter();
const store = usePatientStore();
const loading = ref(true);
const error = ref(false);
// const patient = ref(null);
const patient = computed(() => store.getPatientById(patientId));

// const fetchPatientData = async () => {
//   try {
//     patient.value = store.getPatientById(patientId);
//     if (patient.value) {
//       if (!patient.value.diseaseDescription.length) {
//         const description = await generateDiseaseDescription(patient.value.disease);
//         store.updatePatientDiseaseDescription(patientId, [description]);
//       }
//     } else {
//       throw new Error("Data pasien tidak ditemukan");
//     }
//   } catch (err) {
//     error.value = true;
//     console.error(err);
//   } finally {
//     loading.value = false;
//   }
// };
const fetchPatientData = async () => {
  try {
    patient.value = store.getPatientById(patientId);
    if (patient.value) {
      if (!patient.value.diseaseDescription || patient.value.diseaseDescription.length === 0) {
        const description = await generateDiseaseDescription(patient.value.disease);
        store.updatePatientDiseaseDescription(patientId, [description]);
        patient.value.diseaseDescription = [description]; // Pastikan deskripsi diperbarui
      }
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


const formatMessage = (content) => DOMPurify.sanitize(marked(content));

onMounted(() => {
  fetchPatientData();
});

const goToChatAI = () => {
  router.push(`/chat/${patientId}`);
};
</script>

<style scoped>
.patient-detail {
  width: 100%;
  /* max-width: 1200px; */
  margin: auto;
  padding: 40px;
  background-color: #f9fafb;
  font-family: 'Inter', sans-serif;
}

.title {
  text-align: center;
  color: #2c3e50;
  font-size: 32px;
  font-weight: bold;
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
  background: #ffffff;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  margin-bottom: 20px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.card h2 {
  color: #34495e;
  font-size: 24px;
  margin-bottom: 15px;
}

.card p {
  font-size: 18px;
  color: #7f8c8d;
  line-height: 1.6;
}

.disease-description {
  background-color: #ecf0f1;
  padding: 25px;
  border-radius: 12px;
}

.disease-text p {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 12px;
}

.chat-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 410px;
  padding: 14px;
  background-color: #3498db;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  user-select: none;
}

.chat-button i {
  margin-right: 10px;
}

.chat-button:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}
.info-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  vertical-align: middle;
  color: #34495e;
}
</style>
