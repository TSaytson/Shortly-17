import { Router } from 'express';
import { urlShorten, getUrlById, openUrl, removeUrl } from '../controllers/urls.controllers.js';
import { verifyAuth } from '../middlewares/auth.middlewares.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { urlSchema } from '../schemas/urls.schemas.js'

const router = Router();

router.post('/urls/shorten',
    validateSchema(urlSchema),
    verifyAuth,
    urlShorten
);
router.get('/urls/:id',
    getUrlById
);
router.get('/urls/open/:shortUrl',
    openUrl
);
router.delete('/urls/:id',
    verifyAuth,
    removeUrl
);
export default router;