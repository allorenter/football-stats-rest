import CompetitionService from './competition.service';
import BadRequest from '../../utils/errors/bad-request';

const competitionService = CompetitionService();

exports.create = async (req, res, next) => {
  try {
    const { _id, name } = req.body;
    if (!_id || !name) {
      throw new BadRequest('_id y name requeridos');
    }
    const competition = await competitionService.insert({ _id: _id.toUpperCase(), name });
    return res.status(200).json(competition);
  } catch (err) {
    return next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const competitions = await competitionService.get();
    return res.status(200).json(competitions);
  } catch (err) {
    return next(err);
  }
};

exports.deleteCompetition = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const deleted = await competitionService.deleteCompetition(_id);
    return res.status(200).json(deleted);
  } catch (err) {
    return next(err);
  }
};
