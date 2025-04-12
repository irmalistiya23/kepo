import { Router } from 'express';
import  { createTransaction, createReceipt }  from '../controllers/transactions.controller';
import { upload } from '../middleware/multer';

const router = Router();

router.post('/addTrans/form', createTransaction);
router.post('/addtrans/scan', upload.single('image'), createReceipt)

export default router;