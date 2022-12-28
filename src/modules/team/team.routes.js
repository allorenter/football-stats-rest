import express from 'express';
import TeamController from './team.controller';

const router = express.Router();

router.get('/', TeamController.getTeams);

router.get('/stats', TeamController.getAvgStats);

export default router;
