import express from 'express';
import TeamController from './team.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/', auth, TeamController.create);

router.get('/', TeamController.get);

router.get('/get-by-season-competition/:season/:competition', TeamController.getBySeasonCompetition);

router.get('/get-avg-stats-teams/:season/:competition/:stat', TeamController.getAvgStat);

export default router;
