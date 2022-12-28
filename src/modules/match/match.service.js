import MatchModel from './match.model';
import { getFilterSeason } from '../../utils/functions';

const MatchService = () => {
  const insertMatches = (arrMatches) => MatchModel.insertMany(arrMatches, { ordered: false });

  const insertMatch = (match) => new MatchModel(match).save();

  const getMatches = async ({ season, competition }) => {
    const filter = {};

    if (season) {
      const seasonFilter = getFilterSeason(season);
      filter.matchdate = seasonFilter.matchdate;
    }

    if (competition) {
      filter.competition = competition;
    }

    return MatchModel.find(filter);
  };

  return Object.freeze({
    insertMatches,
    insertMatch,
    getMatches,
  });
};

export default MatchService;
