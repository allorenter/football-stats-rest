import express from 'express';
import CompetitionController from './competition.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.get('/', CompetitionController.get);

router.post('/', auth, CompetitionController.create);

router.delete('/', auth, CompetitionController.deleteCompetition);

export default router;
