import { find, map } from 'lodash';
import MatchModel from '../match/match.model';
import { getFilterSeason } from '../../utils/functions';
import StatService from '../stat/stat.service';

const TeamService = () => {
  const getTeams = async ({ season, competition }) => {
    const filter = {};

    if (season) {
      const seasonFilter = getFilterSeason(season);
      filter.matchdate = seasonFilter.matchdate;
    }

    if (competition) {
      filter.competition = competition;
    }

    const teams = await MatchModel.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$hometeam',
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    return teams
      .filter((team) => team._id !== null && team._id !== '')
      .map((team) => ({ name: team._id }));
  };

  const getAvgStat = async ({ season, competition, stat }) => {
    const filter = {};

    if (season) {
      const seasonFilter = getFilterSeason(season);
      filter.matchdate = seasonFilter.matchdate;
    }

    if (competition) {
      filter.competition = competition;
    }

    const statService = StatService();
    const formattedStat = statService.formatStat(stat);

    const home = await MatchModel.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$hometeam',
          for: { $avg: `$${formattedStat.home}` },
          against: { $avg: `$${formattedStat.away}` },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    const away = await MatchModel.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$awayteam',
          for: { $avg: `$${formattedStat.away}` },
          against: { $avg: `$${formattedStat.home}` },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    return map(home, (teamDataHome) => {
      const teamDataAway = find(away, { _id: teamDataHome._id });
      return {
        teamId: teamDataHome._id,
        teamName: teamDataHome._id,
        homeMatches: { for: teamDataHome.for, against: teamDataHome.against, total: teamDataHome.for + teamDataHome.against },
        awayMatches: { for: teamDataAway.for, against: teamDataAway.against, total: teamDataAway.for + teamDataAway.against },
        allMatches: {
          for: (teamDataHome.for + teamDataAway.for) / 2,
          against: (teamDataHome.against + teamDataAway.against) / 2,
          total: ((teamDataHome.for + teamDataAway.for) / 2) + ((teamDataHome.against + teamDataAway.against) / 2),
        },
      };
    });
  };

  return Object.freeze({
    getTeams,
    getAvgStat,
  });
};

export default TeamService;
