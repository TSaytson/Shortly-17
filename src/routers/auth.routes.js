import {Router} from 'express';
import { signIn, signUp } from '../controllers/auth.controllers.js';
import { validateSignIn, validateSignUp } from '../middlewares/auth.middlewares.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { signUpSchema, signInSchema } from '../schemas/auth.schemas.js'

const router = Router();

router.post('/signup',
    validateSchema(signUpSchema),
    validateSignUp,
    signUp);
router.post('/signin',
    validateSchema(signInSchema),
    validateSignIn,
    signIn);

export default router;