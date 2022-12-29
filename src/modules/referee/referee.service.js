import { map } from 'lodash';
import MatchModel from '../match/match.model';
import StatService from '../stat/stat.service';
import { getFilterSeason } from '../../utils/functions';

const RefereeService = () => {
  const getReferees = async ({ season, competition }) => {
    const filter = {};

    if (season) {
      const seasonFilter = getFilterSeason(season);
      filter.matchdate = seasonFilter.matchdate;
    }

    if (competition) {
      filter.competition = competition;
    }

    const referees = await MatchModel.aggregate([
      {
        $match: filter,
      },
      {
        $group: {
          _id: '$referee',
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    return referees
      .filter((referee) => referee._id !== null && referee._id !== '')
      .map((referee) => ({ name: referee._id }));
  };

  const getBySeasonsCompetition = async ({ season, competition }) => {
    const filter = {};

    if (season) {
      const seasonFilter = getFilterSeason(season);
      filter.matchdate = seasonFilter.matchdate;
    }

    if (competition) {
      filter.competition = competition;
    }

    const statService = StatService();
    const statYellows = statService.formatStat('y');
    const statRedCards = statService.formatStat('r');

    const referees = await MatchModel.aggregate([
      {
        $match: filter,
      },
      {
        $group: {
          _id: '$referee',
          homeYellowCards: { $avg: `$${statYellows.home}` },
          awayYellowCards: { $avg: `$${statYellows.away}` },
          homeRedCards: { $avg: `$${statRedCards.home}` },
          awayRedCards: { $avg: `$${statRedCards.away}` },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    if (referees.length > 0) {
      return map(referees, (referee) => ({
        refereeId: referee._id,
        refereeName: referee._id,
        yellowCards: {
          homeTeam: referee.homeYellowCards,
          awayTeam: referee.awayYellowCards,
          total: referee.homeYellowCards + referee.awayYellowCards,
        },
        redCards: {
          homeTeam: referee.homeRedCards,
          awayTeam: referee.awayRedCards,
          total: referee.homeRedCards + referee.awayRedCards,
        },
      })).filter((refereeData) => refereeData.refereeId !== null);
    }

    return [];
  };

  const getMatches = async ({ season, competition, referee }) => {
    const filter = {};

    if (season) {
      const seasonFilter = getFilterSeason(season);
      filter.matchdate = seasonFilter.matchdate;
    }

    if (competition) {
      filter.competition = competition;
    }

    const regex = new RegExp(`(${referee})`, 'i');
    const matches = await MatchModel.find({
      ...filter,
      referee: {
        $regex: regex,
      },
    }, 'competition matchdate hometeam awayteam referee hy ay hr ar');

    return matches;
  };

  return Object.freeze({
    getReferees,
    getBySeasonsCompetition,
    getMatches,
  });
};

export default RefereeService;
