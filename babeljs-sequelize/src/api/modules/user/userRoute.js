import { Router } from 'express';

import { ToData } from '../../middlewares';
import controller from './userController';
import validation from './userValidation';

const router = Router({ mergeParams: true });

router.get('/users', controller.getAll);

export default router;
