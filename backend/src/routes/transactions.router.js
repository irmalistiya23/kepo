import { Router } from 'express';
import  { createTransaction, createReceipt }  from '../controllers/transactions.controller.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.post('/addTrans/form', createTransaction);
router.post('/addtrans/scan', upload.single('image'), createReceipt)

export default router;