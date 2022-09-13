import { Router } from 'express';

import image from './image.route.js';

const router = Router();

router.use('/images', image)
// router.use('/profiles')

export default router;

