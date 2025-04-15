import { Schema, model } from 'mongoose';

const goalSchema = new Schema({
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
  targetDate: {
    type: Date,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  progress: {
    type: Number,
    default: 0,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
    default: '',
  },
  isCompleted: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

export const Goal = model('Goal', goalSchema); 