import RefereeService from './referee.service';
import succesResponse from '../../utils/response';
import BadRequest from '../../utils/errors/bad-request';

const refereeService = RefereeService();

exports.getReferees = async (req, res, next) => {
  try {
    const { season, competition } = req.query;

    const referees = await refereeService.getReferees({ season, competition });
    return succesResponse(res, 'Arbitros disponibles', referees);
  } catch (err) {
    return next(err);
  }
};

exports.getAvgStats = async (req, res, next) => {
  try {
    const { season, competition } = req.query;

    const referees = await refereeService.getBySeasonsCompetition({ season, competition });
    return succesResponse(res, 'Arbitros de la competicion', referees);
  } catch (err) {
    return next(err);
  }
};

exports.getMatches = async (req, res, next) => {
  try {
    const { season, competition, referee } = req.query;

    if (!referee) {
      throw new BadRequest('referee requeridos');
    }

    const matches = await refereeService.getMatches({ season, competition, referee });
    return res.status(200).json(matches);
  } catch (err) {
    return next(err);
  }
};
