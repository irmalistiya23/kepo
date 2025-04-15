import { Schema, model } from 'mongoose';

const educationSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Pendidikan Formal', 'Pendidikan Non-Formal', 'Kursus', 'Pelatihan', 'Lainnya'],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  savedAmount: {
    type: Number,
    default: 0,
  },
  institution: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Belum Dimulai', 'Dalam Proses', 'Selesai'],
    default: 'Belum Dimulai',
  },
  priority: {
    type: String,
    enum: ['Rendah', 'Sedang', 'Tinggi'],
    default: 'Sedang',
  },
  notes: {
    type: String,
    default: '',
  }
}, {
  timestamps: true
});

export const Education = model('Education', educationSchema); 