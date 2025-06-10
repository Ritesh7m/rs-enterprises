import express from 'express';
import { loginUser, registrUser, adminLogin } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registrUser);
router.post('/login', loginUser);
router.post('/admin/login', adminLogin);

export default router;
