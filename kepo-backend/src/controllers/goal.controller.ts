import { Request, Response } from 'express';
import { Goal } from '../models/goal.model';

export const goalController = {
  // Get all goals for a user
  async getGoals(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const goals = await Goal.find({ userId });
      res.json(goals);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching goals', error });
    }
  },

  // Get a single goal
  async getGoal(req: Request, res: Response) {
    try {
      const goal = await Goal.findById(req.params.id);
      if (!goal) {
        return res.status(404).json({ message: 'Goal not found' });
      }
      res.json(goal);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching goal', error });
    }
  },

  // Create a new goal
  async createGoal(req: Request, res: Response) {
    try {
      const goal = new Goal(req.body);
      await goal.save();
      res.status(201).json(goal);
    } catch (error) {
      res.status(400).json({ message: 'Error creating goal', error });
    }
  },

  // Update a goal
  async updateGoal(req: Request, res: Response) {
    try {
      const goal = await Goal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!goal) {
        return res.status(404).json({ message: 'Goal not found' });
      }
      res.json(goal);
    } catch (error) {
      res.status(400).json({ message: 'Error updating goal', error });
    }
  },

  // Delete a goal
  async deleteGoal(req: Request, res: Response) {
    try {
      const goal = await Goal.findByIdAndDelete(req.params.id);
      if (!goal) {
        return res.status(404).json({ message: 'Goal not found' });
      }
      res.json({ message: 'Goal deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting goal', error });
    }
  },

  // Update goal progress
  async updateProgress(req: Request, res: Response) {
    try {
      const { currentAmount } = req.body;
      const goal = await Goal.findById(req.params.id);
      
      if (!goal) {
        return res.status(404).json({ message: 'Goal not found' });
      }

      goal.currentAmount = currentAmount;
      goal.progress = (currentAmount / goal.targetAmount) * 100;
      goal.isCompleted = goal.progress >= 100;

      await goal.save();
      res.json(goal);
    } catch (error) {
      res.status(400).json({ message: 'Error updating progress', error });
    }
  }
}; 