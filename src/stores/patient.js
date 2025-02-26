import { defineStore } from 'pinia';

export const usePatientStore = defineStore('patient', {
    state: () => ({
        patients: [
            { id: 1, room: 'VIP', name: 'Budi Salim', age: 45, disease: 'Hipertensi', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 2, room: 'VIP', name: 'Maya Angelina', age: 38, disease: 'Diabetes', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 3, room: 'VIP', name: 'Ahmad Faisal', age: 50, disease: 'Jantung Koroner', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 4, room: 'VIP', name: 'Siti Nurhaliza', age: 35, disease: 'Asma', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 5, room: 'VIP', name: 'Rudi Hartono', age: 60, disease: 'Stroke', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 6, room: 'VIP', name: 'Dewi Sartika', age: 29, disease: 'Anemia', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 7, room: 'VIP', name: 'Hendra Gunawan', age: 55, disease: 'Gagal Ginjal', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 8, room: 'VIP', name: 'Lisa Marlina', age: 41, disease: 'Kanker Payudara', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 9, room: 'VIP', name: 'Taufik Hidayat', age: 30, disease: 'Tuberkulosis', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 10, room: 'VIP', name: 'Indra Wijaya', age: 48, disease: 'Osteoporosis', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 11, room: 'VIP', name: 'Farah Azzahra', age: 52, disease: 'Artritis Reumatoid', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 12, room: 'VIP', name: 'Bagas Saputra', age: 33, disease: 'Pneumonia', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 13, room: 'VIP', name: 'Nina Kartika', age: 40, disease: 'Epilepsi', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 14, room: 'VIP', name: 'Rizky Ramadhan', age: 47, disease: 'Demensia', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 15, room: 'VIP', name: 'Lutfi Hakim', age: 59, disease: 'Hepatitis', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 16, room: 'VIP', name: 'Yulianti Sari', age: 34, disease: 'Alergi', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 17, room: 'VIP', name: 'Faisal Rizky', age: 42, disease: 'Parkinson', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 18, room: 'VIP', name: 'Dina Ayu', age: 31, disease: 'Gangguan Tiroid', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 19, room: 'VIP', name: 'Bambang Setiawan', age: 50, disease: 'Kolesterol Tinggi', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
            { id: 20, room: 'VIP', name: 'Sri Rahayu', age: 43, disease: 'Gastritis', doctor: 'dr. Eric SpPAS', nurse: 'Nina B', diseaseDescription: [] },
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
