import MatchService from './match.service';
import succesResponse from '../../utils/response';

const matchService = MatchService();

exports.getMatches = async (req, res, next) => {
  try {
    const { season, competition } = req.query;

    const matches = await matchService.getMatches({ season, competition });
    return succesResponse(res, 'Partidos', matches);
  } catch (err) {
    next(err);
    return null;
  }
};
