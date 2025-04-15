import { Router } from 'express';
import  { addSaving }  from '../controllers/goals.controller.js';

const router = Router();

router.post('/addSaving', addSaving)

export default router;