import MatchService from './match.service';

const matchService = MatchService();

exports.getMatches = async (req, res, next) => {
  try {
    const { season, competition } = req.query;

    const matches = await matchService.getMatches({ season, competition });
    return res.status(200).json(matches);
  } catch (err) {
    return next(err);
  }
};
