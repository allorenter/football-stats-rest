import express from 'express';
import MatchController from './match.controller';

const router = express.Router();

router.get('/', MatchController.get);

export default router;
