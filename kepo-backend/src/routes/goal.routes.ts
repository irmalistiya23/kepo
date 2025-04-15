import express from 'express';
import { goalController } from '../controllers/goal.controller';

const router = express.Router();

// Get all goals for a user
router.get('/user/:userId', goalController.getGoals);

// Get a single goal
router.get('/:id', goalController.getGoal);

// Create a new goal
router.post('/', goalController.createGoal);

// Update a goal
router.put('/:id', goalController.updateGoal);

// Delete a goal
router.delete('/:id', goalController.deleteGoal);

// Update goal progress
router.patch('/:id/progress', goalController.updateProgress);

export default router; 