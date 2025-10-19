import express from 'express';
import { login, logout, getUsers, createUser } from '../controllers/userController.js';
import verifyToken from '../middlewares/validateToken.js';

const router = express.Router();

router.post("/login", login);
router.post("/logout", verifyToken, logout);

router.post('/create-user', createUser);
router.get('/get-user', verifyToken, getUsers);

export default router;