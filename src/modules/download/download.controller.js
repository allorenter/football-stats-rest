import DownloadService from './download.service';

const downloadService = DownloadService();

exports.executeDownload = async (req, res, next) => {
  try {
    downloadService.executeDownload();
    return res.status(200).json({ message: 'Descarga Iniciada' });
  } catch (err) {
    return next(err);
  }
};

exports.getLastDownload = async (req, res, next) => {
  try {
    const last = await downloadService.getLastDownload();
    return res.status(200).json(last);
  } catch (err) {
    return next(err);
  }
};
