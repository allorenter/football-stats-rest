import express from 'express';
import StatController from './stat.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/', auth, StatController.create);

router.get('/', StatController.getStats);

export default router;
