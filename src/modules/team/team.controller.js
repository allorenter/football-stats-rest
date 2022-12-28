import TeamService from './team.service';
import BadRequest from '../../utils/errors/bad-request';
import succesResponse from '../../utils/response';

const teamService = TeamService();

exports.getTeams = async (req, res, next) => {
  try {
    const { season, competition } = req.query;

    const teams = await teamService.getTeams({ season, competition });
    return succesResponse(res, 'Equipos disponibles', teams);
  } catch (err) {
    next(err);
    return null;
  }
};

exports.getAvgStats = async (req, res, next) => {
  try {
    const { season, competition, stat } = req.query;

    if (!stat) {
      throw new BadRequest('Campos requeridos incorrectos');
    }

    const result = await teamService.getAvgStat({ season, competition, stat });
    return succesResponse(res, 'Datos disponibles', result);
  } catch (err) {
    next(err);
    return null;
  }
};
