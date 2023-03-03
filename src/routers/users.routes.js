import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middlewares.js";
import { usersData, ranking } from '../controllers/users.controllers.js'

const router = Router();

router.get('/users/me', verifyAuth, usersData);
router.get('/ranking', ranking)

export default router;