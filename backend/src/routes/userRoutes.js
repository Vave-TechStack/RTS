import express from 'express';
import { login, logout, getUsers, createUser, createMember, getMember } from '../controllers/userController.js';
import verifyToken from '../middlewares/validateToken.js';

const router = express.Router();

router.post("/login", login);
router.post("/logout", verifyToken, logout);

router.post('/create-user', createUser);
router.get('/get-user', verifyToken, getUsers);

router.post('/member', createMember);
router.get('/member', getMember);

export default router;