import express from 'express';
import DownloadController from './download.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/force', auth, DownloadController.executeDownload);

router.get('/last', DownloadController.getLastDownload);

export default router;
