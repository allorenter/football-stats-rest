import TeamService from './team.service';
import BadRequest from '../../utils/errors/bad-request';
import succesResponse from '../../utils/response';
import { isValidSeason } from '../../utils/functions';

const teamService = TeamService();

exports.getTeams = async (req, res, next) => {
  try {
    const teams = await teamService.getTeams();
    return succesResponse(res, 'Equipos disponibles', teams);
  } catch (err) {
    next(err);
    return null;
  }
};

exports.getAvgStats = async (req, res, next) => {
  try {
    const { season, competition, stat } = req.query;
    if (!isValidSeason(season) || !competition || !stat) {
      throw new BadRequest('Campos requeridos incorrectos');
    }
    const result = await teamService.getAvgStat(season, competition, stat);
    return succesResponse(res, 'Datos disponibles', result);
  } catch (err) {
    next(err);
    return null;
  }
};

// exports.getBySeasonCompetition = async (req, res, next) => {
//   try {
//     const { season, competition } = req.params;
//     if (!isValidSeason(season) && !competition) {
//       throw new BadRequest('Competición y temporada requeridos');
//     }
//     const teams = await teamService.getBySeasonCompetition(season, competition);
//     return succesResponse(res, 'Equipos disponibles', teams);
//   } catch (err) {
//     next(err);
//     return null;
//   }
// };
