import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { usersData, ranking } from '../controllers/users.controller.js'

const router = Router();

router.get('/users/me', verifyAuth, usersData);
router.get('/ranking', ranking)

export default router;