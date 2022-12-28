import express from 'express';
import TeamController from './team.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/', auth, TeamController.create);

router.get('/', TeamController.get);

router.get('/stats', TeamController.getAvgStat);

export default router;
