import RefereeService from './referee.service';
import succesResponse from '../../utils/response';

const refereeService = RefereeService();

exports.getReferees = async (req, res, next) => {
  try {
    const { season, competition } = req.query;

    const referees = await refereeService.getReferees({ season, competition });
    return succesResponse(res, 'Arbitros disponibles', referees);
  } catch (err) {
    next(err);
    return null;
  }
};

exports.getAvgStats = async (req, res, next) => {
  try {
    const { season, competition } = req.query;

    const referees = await refereeService.getBySeasonsCompetition({ season, competition });
    return succesResponse(res, 'Arbitros de la competicion', referees);
  } catch (err) {
    next(err);
    return null;
  }
};
