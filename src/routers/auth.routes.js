import {Router} from 'express';
import { signIn, signUp } from '../controllers/auth.controller.js';
import { validateSignIn, validateSignUp } from '../middlewares/auth.middleware.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { signUpSchema, signInSchema } from '../schemas/auth.schemas.js'

const router = Router();

router.post('/signUp',
    validateSchema(signUpSchema),
    validateSignUp,
    signUp);
router.post('/signIn',
    validateSchema(signInSchema),
    validateSignIn,
    signIn);

export default router;