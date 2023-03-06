import { Router } from 'express';
import { urlShorten, getUrlById, openUrl, removeUrl } from '../controllers/urls.controller.js';
import { verifyAuth } from '../middlewares/auth.middleware.js';
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