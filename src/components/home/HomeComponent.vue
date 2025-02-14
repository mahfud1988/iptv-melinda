<template>
    <div class="iptv-container">
        <!-- Header dan Pencarian (Fixed) -->
        <div class="fixed-header">
            <h1>Selamat Datang di IPTV Kamar Pasien</h1>
            <p>Informasi Pasien & Penyakit</p>

            <!-- Input Pencarian -->
            <div class="search-container">
                <input 
                    v-model="searchQuery" 
                    type="text" 
                    placeholder="Cari pasien atau penyakit..." 
                    class="search-input"
                />
                <span v-if="searchQuery" class="clear-icon" @click="clearSearch">×</span>
            </div>
        </div>

        <!-- Daftar Pasien -->
        <div :class="['patient-list', { single: filteredPatients.length === 1 }]">
            <router-link 
                v-for="patient in filteredPatients" 
                :key="patient.id" 
                :to="`/patient/${patient.id}`" 
                class="patient-card"
            >
                <h3>{{ patient.name }}</h3>
                <p><strong>Usia:</strong> {{ patient.age }} Tahun</p>
                <p><strong>Penyakit:</strong> {{ patient.disease }}</p>
            </router-link>
        </div>

        <!-- Jika Tidak Ada Hasil -->
        <div v-if="filteredPatients.length === 0" class="loading">
            <p>Tidak ada hasil ditemukan...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePatientStore } from '@/stores/patient';

// Mengakses store Pinia
const patientStore = usePatientStore();
const patients = patientStore.patients;

// State untuk pencarian
const searchQuery = ref('');

// Fungsi untuk menghapus input pencarian
const clearSearch = () => {
    searchQuery.value = '';
};

// Filter daftar pasien berdasarkan nama atau penyakit
const filteredPatients = computed(() => {
    return patients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        patient.disease.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});
</script>

<style scoped>
/* Container utama */
.iptv-container {
    text-align: center;
    max-width: 100%;
    min-height: 1000px;
    margin: 0 auto;
    padding: 200px 1rem 0 1rem; /* Tambahkan padding atas agar konten tidak tertutup */
}

/* Header dan Input Pencarian (Fixed) */
.fixed-header {
    position: fixed; /* Tetap di atas */
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    text-align: center;
    padding: 15px 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    /* border: 1px solid green; */
}

/* Container Input Pencarian */
.search-container {
    position: relative;
    display: inline-block;
    width: 100%;
    /* border: 1px solid green; */
}

/* Input Pencarian */
.search-input {
    width: 90%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
    outline: none;
}

/* Ikon X untuk menghapus pencarian */
.clear-icon {
    position: absolute;
    right: 6%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 18px;
    color: #888;
    transition: color 0.2s;
}

.clear-icon:hover {
    color: #000;
}

/* Daftar Pasien */
.patient-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-top: 20px;
}

/* Jika hanya ada satu hasil pencarian, tampilkan dalam satu kolom */
.patient-list.single {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 20px auto;
}

.patient-card {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: black;
    transition: transform 0.2s;
}

.patient-card:hover {
    transform: scale(1.05);
}

.loading {
    font-size: 18px;
    color: #888;
    margin-top: 20px;
}

/* Media Query untuk Mobile */
@media (max-width: 767px) {
    /* Menjadikan header sticky pada perangkat mobile */
    .fixed-header {
        /* position: sticky; */
        top: 0;
        left: 0;
        /* padding: 10px 15px; */
        /* border: 1px solid gold; */
    }
    .clear-icon{
        right: 10%;
    }

    .iptv-container {
        padding-top: 250px;
    }

    /* Mengubah jumlah kolom daftar pasien */
    .patient-list {
        grid-template-columns: 1fr 1fr; /* 2 kolom pada mobile */
    }
}
</style>
