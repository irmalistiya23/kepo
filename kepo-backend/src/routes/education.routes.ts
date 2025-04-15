import express from 'express';
import { educationController } from '../controllers/education.controller';

const router = express.Router();

// Get all education plans for a user
router.get('/user/:userId', educationController.getEducations);

// Get a single education plan
router.get('/:id', educationController.getEducation);

// Create a new education plan
router.post('/', educationController.createEducation);

// Update an education plan
router.put('/:id', educationController.updateEducation);

// Delete an education plan
router.delete('/:id', educationController.deleteEducation);

// Update saved amount and status
router.patch('/:id/progress', educationController.updateProgress);

// Get education plans by category
router.get('/user/:userId/category/:category', educationController.getEducationsByCategory);

// Get education plans by status
router.get('/user/:userId/status/:status', educationController.getEducationsByStatus);

export default router; 