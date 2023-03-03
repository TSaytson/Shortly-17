import {Router} from 'express';
import authRoutes from './auth.routes.js'
import urlsRoutes from './urls.routes.js'
import usersRoutes from './users.routes.js'

const router = Router();

router.use([authRoutes,
    urlsRoutes,
    usersRoutes]);

export default router;