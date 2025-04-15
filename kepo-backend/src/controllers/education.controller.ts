import { Request, Response } from 'express';
import { Education } from '../models/education.model';

export const educationController = {
  // Get all education plans for a user
  async getEducations(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const educations = await Education.find({ userId });
      res.json(educations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching education plans', error });
    }
  },

  // Get a single education plan
  async getEducation(req: Request, res: Response) {
    try {
      const education = await Education.findById(req.params.id);
      if (!education) {
        return res.status(404).json({ message: 'Education plan not found' });
      }
      res.json(education);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching education plan', error });
    }
  },

  // Create a new education plan
  async createEducation(req: Request, res: Response) {
    try {
      const education = new Education(req.body);
      await education.save();
      res.status(201).json(education);
    } catch (error) {
      res.status(400).json({ message: 'Error creating education plan', error });
    }
  },

  // Update an education plan
  async updateEducation(req: Request, res: Response) {
    try {
      const education = await Education.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!education) {
        return res.status(404).json({ message: 'Education plan not found' });
      }
      res.json(education);
    } catch (error) {
      res.status(400).json({ message: 'Error updating education plan', error });
    }
  },

  // Delete an education plan
  async deleteEducation(req: Request, res: Response) {
    try {
      const education = await Education.findByIdAndDelete(req.params.id);
      if (!education) {
        return res.status(404).json({ message: 'Education plan not found' });
      }
      res.json({ message: 'Education plan deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting education plan', error });
    }
  },

  // Update saved amount and status
  async updateProgress(req: Request, res: Response) {
    try {
      const { savedAmount } = req.body;
      const education = await Education.findById(req.params.id);
      
      if (!education) {
        return res.status(404).json({ message: 'Education plan not found' });
      }

      education.savedAmount = savedAmount;
      
      // Update status based on saved amount
      if (savedAmount >= education.cost) {
        education.status = 'Selesai';
      } else if (savedAmount > 0) {
        education.status = 'Dalam Proses';
      }

      await education.save();
      res.json(education);
    } catch (error) {
      res.status(400).json({ message: 'Error updating progress', error });
    }
  },

  // Get education plans by category
  async getEducationsByCategory(req: Request, res: Response) {
    try {
      const { userId, category } = req.params;
      const educations = await Education.find({ userId, category });
      res.json(educations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching education plans by category', error });
    }
  },

  // Get education plans by status
  async getEducationsByStatus(req: Request, res: Response) {
    try {
      const { userId, status } = req.params;
      const educations = await Education.find({ userId, status });
      res.json(educations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching education plans by status', error });
    }
  }
}; 