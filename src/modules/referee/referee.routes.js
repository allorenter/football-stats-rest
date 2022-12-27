import express from 'express';
import refereeController from './referee.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/', auth, refereeController.create);

router.get('/', refereeController.get);

router.get('/get-by-competition/:competition', refereeController.getByCompetition);

router.post('/get-by-seasons-competition', refereeController.getBySeasonCompetition);

export default router;
