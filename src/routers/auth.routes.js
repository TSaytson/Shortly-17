import {Router} from 'express';
import { validateAuth } from '../middlewares/auth.middlewares.js';

const router = Router();

router.post('/signUp', validateAuth);
router.post('/signIn');

export default router;