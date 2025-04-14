import { Router } from 'express';
import  { addSaving }  from '../controllers/goals.controller';

const router = Router();

router.post('/addSaving', addSaving)

export default router;