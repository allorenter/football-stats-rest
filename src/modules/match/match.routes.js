import express from 'express';
import MatchController from './match.controller';

const router = express.Router();

router.get('/', MatchController.get);

router.get('/get-by-competition/:_id', MatchController.getByCompetition);

router.get('/get-by-season/:season', MatchController.getBySeason);

router.get('/get-by-season-competition/:season/:competition', MatchController.getBySeasonCompetition);

export default router;
