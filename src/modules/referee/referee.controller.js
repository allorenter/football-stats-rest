import RefereeService from './referee.service';
import BadRequest from '../../utils/errors/bad-request';
import succesResponse from '../../utils/response';
import { isValidSeason } from '../../utils/functions';

const refereeService = RefereeService();

exports.create = async (req, res, next) => {
  try {
    const { _id, name } = req.body;
    if (!_id || !name) {
      throw new BadRequest('Id, name requeridos');
    }
    const referee = await refereeService.insert({
      _id,
      name,
    });
    return succesResponse(res, 'Arbitro creado', referee);
  } catch (err) {
    next(err);
    return null;
  }
};

exports.get = async (req, res, next) => {
  try {
    const referees = await refereeService.get();
    return succesResponse(res, 'Arbitros disponibles', referees);
  } catch (err) {
    next(err);
    return null;
  }
};

exports.getByCompetition = async (req, res, next) => {
  try {
    const { competition } = req.params;
    if (!competition) {
      throw new BadRequest('Competición requerida');
    }
    return succesResponse(res, 'Arbitros de la competición', await refereeService.getByCompetition(competition));
  } catch (err) {
    next(err);
    return null;
  }
};

exports.getBySeasonCompetition = async (req, res, next) => {
  try {
    const { season, competition } = req.query;
    if (!isValidSeason(season) || !competition) {
      throw new BadRequest('Campos requeridos incorrectos');
    }
    const comp = competition || 'E0';
    const seasons = [season];
    return succesResponse(res, 'Arbitros de la competicion', await refereeService.getBySeasonsCompetition(seasons, comp));
  } catch (err) {
    next(err);
    return null;
  }
};
