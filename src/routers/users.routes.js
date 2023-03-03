import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middlewares.js";
import { usersData } from '../controllers/users.controllers.js'
const router = Router();

router.get('/users/me', verifyAuth, usersData)

export default router;