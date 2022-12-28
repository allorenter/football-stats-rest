import { FIRST_YEAR } from '../constants';

/**
 *  Comprueba si una variable es un array y no está vacío
 *
 * @param {Array} array
 */

export const isArrayNotEmpty = (array) => Array.isArray(array) && array.length > 0;

/**
 * Valida si una temporada tiene un formato correcto
 *
 * @param {String} season
 */
export const isValidSeason = (season) => {
  const strSeason = `${season}`;
  if (typeof strSeason !== 'string' || strSeason.length !== 4) {
    return false;
  }
  const firstPart = strSeason.substring(0, 2);
  const secondPart = strSeason.substring(2);
  if (Number.isNaN(firstPart) || Number.isNaN(secondPart)) {
    return false;
  }
  return true;
};

/**
 * Transforma una temporada en los años que la forman
 *
 * @param {String} season
 */
export const seasonToYears = (season) => {
  if (!isValidSeason(season)) {
    return false;
  }
  const prefix = FIRST_YEAR.substring(2) < season.substring(2) ? '19' : '20';
  const seasonFirsPart = season.substring(0, 2);
  const seasonSecondPart = season.substring(2);
  const response = {
    firstYear: parseInt(prefix + seasonFirsPart, 10),
    secondYear: parseInt(prefix + seasonSecondPart, 10),
  };
  if (seasonSecondPart === '00') {
    const newPrefix = parseInt(prefix, 10) - 1;
    response.firstYear = parseInt(newPrefix + seasonFirsPart, 10);
  }
  return response;
};

/**
 * Devuelve las dos fechas entre las que se juegan los partidos de una temporada
 * Por defecto los partidos de una temporada empiezan en agosto y terminan en mayo
 * aunque puede haber temporadas que empiecen y terminen en fechas distintas a estas
 * en ese caso habría que especificarlo de alguna
 *
 * @param {String} season
 */
export const getDatesSeason = (season) => {
  if (!isValidSeason(season)) {
    return false;
  }
  const years = seasonToYears(season);
  return {
    initialDate: new Date(years.firstYear, 6, 15),
    finishDate: new Date(years.secondYear, 6, 15),
  };
};

/**
 * Convierte un String pasado por parámetros a minúsculas
 *
 * @param {String} str
 */
export const lowerCaseString = (str) => str.toLowerCase();

export const getFilterSeason = (season) => {
  if (!isValidSeason(season)) {
    return false;
  }
  const datesCompetition = getDatesSeason(season);
  return {
    matchdate: {
      $gte: datesCompetition.initialDate,
      $lt: datesCompetition.finishDate,
    },
  };
};
