import { defineStore } from 'pinia';

export const usePatientStore = defineStore('patient', {
    state: () => ({
        patients: [
            { id: 1, name: 'Budi Salim', age: 45, disease: 'Hipertensi', diseaseDescription: ['Tekanan darah tinggi atau Hipertensi (HTN), kadang-kadang disebut juga dengan hipertensi arteri, adalah kondisi medis kronis dengan tekanan darah di arteri meningkat. Peningkatan ini menyebabkan jantung harus bekerja lebih keras dari biasanya untuk mengedarkan darah melalui pembuluh darah. Tekanan darah melibatkan dua pengukuran, sistolik dan diastolik, tergantung apakah otot jantung berkontraksi (sistole) atau berelaksasi di antara denyut (diastole). Tekanan darah normal pada saat istirahat adalah dalam kisaran sistolik (bacaan atas) 100–140 mmHg dan diastolik (bacaan bawah) 60–90 mmHg. Tekanan darah tinggi terjadi bila terus-menerus berada pada 140/90 mmHg atau lebih.'] },
            { id: 2, name: 'Maya Angelina', age: 38, disease: 'Diabetes', diseaseDescription: ['Kondisi kadar gula darah yang tinggi.'] },
            { id: 3, name: 'Ahmad Faisal', age: 50, disease: 'Jantung Koroner', diseaseDescription: ['Penyempitan pembuluh darah ke jantung.'] },
            { id: 4, name: 'Siti Nurhaliza', age: 35, disease: 'Asma', diseaseDescription: ['Gangguan pernapasan yang menyebabkan sesak napas.'] },
            { id: 5, name: 'Rudi Hartono', age: 60, disease: 'Stroke', diseaseDescription: ['Gangguan suplai darah ke otak.'] },
            { id: 6, name: 'Dewi Sartika', age: 29, disease: 'Anemia', diseaseDescription: ['Kekurangan sel darah merah dalam tubuh.'] },
            { id: 7, name: 'Hendra Gunawan', age: 55, disease: 'Gagal Ginjal', diseaseDescription: ['Kerusakan fungsi ginjal secara bertahap.'] },
            { id: 8, name: 'Lisa Marlina', age: 41, disease: 'Kanker Payudara', diseaseDescription: ['Pertumbuhan sel abnormal di payudara.'] },
            { id: 9, name: 'Taufik Hidayat', age: 30, disease: 'Tuberkulosis', diseaseDescription: ['Infeksi bakteri yang menyerang paru-paru.'] },
            { id: 10, name: 'Indra Wijaya', age: 48, disease: 'Osteoporosis', diseaseDescription: ['Kepadatan tulang menurun, rentan patah tulang.'] },
            { id: 11, name: 'Farah Azzahra', age: 52, disease: 'Artritis Reumatoid', diseaseDescription: ['Peradangan sendi yang menyebabkan nyeri.'] },
            { id: 12, name: 'Bagas Saputra', age: 33, disease: 'Pneumonia', diseaseDescription: ['Infeksi paru-paru yang disebabkan oleh bakteri atau virus.'] },
            { id: 13, name: 'Nina Kartika', age: 40, disease: 'Epilepsi', diseaseDescription: ['Gangguan sistem saraf yang menyebabkan kejang.'] },
            { id: 14, name: 'Rizky Ramadhan', age: 47, disease: 'Demensia', diseaseDescription: ['Penurunan daya ingat dan kemampuan berpikir.'] },
            { id: 15, name: 'Lutfi Hakim', age: 59, disease: 'Hepatitis', diseaseDescription: ['Peradangan pada hati akibat virus atau faktor lain.'] },
            { id: 16, name: 'Yulianti Sari', age: 34, disease: 'Alergi', diseaseDescription: ['Reaksi berlebihan sistem imun terhadap zat tertentu.'] },
            { id: 17, name: 'Faisal Rizky', age: 42, disease: 'Parkinson', diseaseDescription: ['Gangguan saraf yang menyebabkan tremor dan kekakuan otot.'] },
            { id: 18, name: 'Dina Ayu', age: 31, disease: 'Gangguan Tiroid', diseaseDescription: ['Gangguan pada produksi hormon tiroid.'] },
            { id: 19, name: 'Bambang Setiawan', age: 50, disease: 'Kolesterol Tinggi', diseaseDescription: ['Kadar lemak dalam darah yang melebihi batas normal.'] },
            { id: 20, name: 'Sri Rahayu', age: 43, disease: 'Gastritis', diseaseDescription: ['Peradangan pada lapisan lambung.'] },
        ]
    }),
    getters: {
        getPatientById: (state) => (id) => {
            return state.patients.find(patient => patient.id === id);
        }
    },
    actions: {
        updatePatientDiseaseDescription(id, description) {
            const patient = this.patients.find(patient => patient.id === id);
            if (patient) {
                patient.diseaseDescription = description;
            }
        }
    }
});
