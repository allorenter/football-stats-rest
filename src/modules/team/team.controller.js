import TeamService from './team.service';
import BadRequest from '../../utils/errors/bad-request';

const teamService = TeamService();

exports.getTeams = async (req, res, next) => {
  try {
    const { season, competition } = req.query;
    const teams = await teamService.getTeams({ season, competition });
    return res.status(200).json(teams);
  } catch (err) {
    return next(err);
  }
};

exports.getAvgStats = async (req, res, next) => {
  try {
    const { season, competition, stat } = req.query;

    if (!stat) {
      throw new BadRequest('Campos requeridos incorrectos');
    }

    const result = await teamService.getAvgStat({ season, competition, stat });
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};
