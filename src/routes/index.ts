import { Router, Request, Response} from 'express';

import auth from './auth/index.js';
import file from './file/index.js'

const routes = Router();

routes.use('/auth', auth)
routes.use('/file', file)


export default routes;
