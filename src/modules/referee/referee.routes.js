import express from 'express';
import refereeController from './referee.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/', auth, refereeController.create);

router.get('/', refereeController.get);

router.get('/stats', refereeController.getBySeasonCompetition);

export default router;
