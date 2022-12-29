import express from 'express';
import refereeController from './referee.controller';

const router = express.Router();

router.get('/', refereeController.getReferees);

router.get('/stats', refereeController.getAvgStats);

router.get('/matches', refereeController.getMatches);

export default router;
