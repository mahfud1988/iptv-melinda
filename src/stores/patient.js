import { defineStore } from 'pinia';

export const usePatientStore = defineStore('patient', {
    state: () => ({
        patients: [
            { id: 1, room: 'VIP', name: 'Budi Salim', age: 45, disease: 'Hipertensi', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Tekanan darah tinggi atau Hipertensi (HTN), kadang-kadang disebut juga dengan hipertensi arteri, adalah kondisi medis kronis dengan tekanan darah di arteri meningkat. Peningkatan ini menyebabkan jantung harus bekerja lebih keras dari biasanya untuk mengedarkan darah melalui pembuluh darah. Tekanan darah melibatkan dua pengukuran, sistolik dan diastolik, tergantung apakah otot jantung berkontraksi (sistole) atau berelaksasi di antara denyut (diastole). Tekanan darah normal pada saat istirahat adalah dalam kisaran sistolik (bacaan atas) 100–140 mmHg dan diastolik (bacaan bawah) 60–90 mmHg. Tekanan darah tinggi terjadi bila terus-menerus berada pada 140/90 mmHg atau lebih.'] },
            { id: 2, room: 'VIP', name: 'Maya Angelina', age: 38, disease: 'Diabetes', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Kondisi kadar gula darah yang tinggi.'] },
            { id: 3, room: 'VIP', name: 'Ahmad Faisal', age: 50, disease: 'Jantung Koroner', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Penyempitan pembuluh darah ke jantung.'] },
            { id: 4, room: 'VIP', name: 'Siti Nurhaliza', age: 35, disease: 'Asma', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Gangguan pernapasan yang menyebabkan sesak napas.'] },
            { id: 5, room: 'VIP', name: 'Rudi Hartono', age: 60, disease: 'Stroke', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Gangguan suplai darah ke otak.'] },
            { id: 6, room: 'VIP', name: 'Dewi Sartika', age: 29, disease: 'Anemia', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Kekurangan sel darah merah dalam tubuh.'] },
            { id: 7, room: 'VIP', name: 'Hendra Gunawan', age: 55, disease: 'Gagal Ginjal', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Kerusakan fungsi ginjal secara bertahap.'] },
            { id: 8, room: 'VIP', name: 'Lisa Marlina', age: 41, disease: 'Kanker Payudara', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Pertumbuhan sel abnormal di payudara.'] },
            { id: 9, room: 'VIP', name: 'Taufik Hidayat', age: 30, disease: 'Tuberkulosis', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Infeksi bakteri yang menyerang paru-paru.'] },
            { id: 10, room: 'VIP', name: 'Indra Wijaya', age: 48, disease: 'Osteoporosis', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Kepadatan tulang menurun, rentan patah tulang.'] },
            { id: 11, room: 'VIP', name: 'Farah Azzahra', age: 52, disease: 'Artritis Reumatoid', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Peradangan sendi yang menyebabkan nyeri.'] },
            { id: 12, room: 'VIP', name: 'Bagas Saputra', age: 33, disease: 'Pneumonia', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Infeksi paru-paru yang disebabkan oleh bakteri atau virus.'] },
            { id: 13, room: 'VIP', name: 'Nina Kartika', age: 40, disease: 'Epilepsi', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Gangguan sistem saraf yang menyebabkan kejang.'] },
            { id: 14, room: 'VIP', name: 'Rizky Ramadhan', age: 47, disease: 'Demensia', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Penurunan daya ingat dan kemampuan berpikir.'] },
            { id: 15, room: 'VIP', name: 'Lutfi Hakim', age: 59, disease: 'Hepatitis', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Peradangan pada hati akibat virus atau faktor lain.'] },
            { id: 16, room: 'VIP', name: 'Yulianti Sari', age: 34, disease: 'Alergi', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Reaksi berlebihan sistem imun terhadap zat tertentu.'] },
            { id: 17, room: 'VIP', name: 'Faisal Rizky', age: 42, disease: 'Parkinson', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Gangguan saraf yang menyebabkan tremor dan kekakuan otot.'] },
            { id: 18, room: 'VIP', name: 'Dina Ayu', age: 31, disease: 'Gangguan Tiroid', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Gangguan pada produksi hormon tiroid.'] },
            { id: 19, room: 'VIP', name: 'Bambang Setiawan', age: 50, disease: 'Kolesterol Tinggi', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Kadar lemak dalam darah yang melebihi batas normal.'] },
            { id: 20, room: 'VIP', name: 'Sri Rahayu', age: 43, disease: 'Gastritis', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: ['Peradangan pada lapisan lambung.'] },
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
