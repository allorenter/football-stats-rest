import StatService from './stat.service';
import BadRequest from '../../utils/errors/bad-request';

const statService = StatService();

exports.create = async (req, res, next) => {
  try {
    const { _id, name, type } = req.body;
    if (!_id || !name || !type) {
      throw new BadRequest('Id, name y type requeridos');
    }
    const stat = await statService.insert({
      _id,
      name,
      type,
    });
    return res.status(200).json(stat);
  } catch (err) {
    return next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const stats = await statService.getStats();
    return res.status(200).json(stats);
  } catch (err) {
    return next(err);
  }
};
