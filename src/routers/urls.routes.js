import { Router } from 'express';
import { urlShorten } from '../controllers/urls.controllers.js';
import { verifyAuth } from '../middlewares/urls.middlewares.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { urlSchema } from '../schemas/urls.schemas.js'

const router = Router();

router.post('/urls/shorten',
    validateSchema(urlSchema),
    verifyAuth,
    urlShorten);
router.get('/urls/:id')

export default router;