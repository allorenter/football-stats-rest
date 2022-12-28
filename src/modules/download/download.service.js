import csv from 'csv-parser';
import https from 'https';
import { mapKeys, flattenDeep } from 'lodash';
import DownloadModel from './download.model';
import MatchService from '../match/match.service';
import CompetitionService from '../competition/competition.service';
import { isArrayNotEmpty, lowerCaseString } from '../../utils/functions';
import InvalidCompetititons from '../../utils/errors/invalid-competitions';
import { FIRST_YEAR, URL_DOWNLOAD_SERVER } from '../../constants';

const DownloadService = () => {
  const date = new Date();

  /**
     * Renombra algunas de las claves de las columnas del CSV descargado porque
     * tienen nombres que pueden dar problemas con JS
     *
     */
  const formatData = (objMatch) => {
    const renamedProperties = {
      Div: 'competition',
      Date: 'matchDate',
      'B365>2.5': 'b365o25',
      'B365<2.5': 'b365u25',
      'P>2.5': 'po25',
      'P<2.5': 'pu25',
      'Max>2.5': 'maxo25',
      'Max<2.5': 'maxu25',
      'Avg>2.5': 'avgo25',
      'Avg<2.5': 'avgu25',
      'B365C>2.5': 'b365co25',
      'B365C<2.5': 'b365cu25',
      'PC>2.5': 'pco25',
      'PC<2.5': 'pcu25',
      'MaxC>2.5': 'maxco25',
      'MaxC<2.5': 'maxcu25',
      'AvgC>2.5': 'avgc025',
      'AvgC<2.5': 'avgcu25',
    };
    const match = objMatch;
    if (match.Date) {
      const arrDates = match.Date.split('/');
      const prefix = parseInt(arrDates[2], 10) >= FIRST_YEAR.toString().substring(2) ? '19' : '20';
      const year = arrDates[2]?.length === 2 ? `${prefix}${arrDates[2]}` : arrDates[2];
      match.Date = new Date(year, arrDates[1] - 1, arrDates[0]);
    }
    return mapKeys(match, (value, key) => lowerCaseString(renamedProperties[key] || key));
  };

  /**
    * Descarga los datos en formato CSV de una competición en una temporada
    *
    */
  const downloadCsv = (competition) => new Promise((resolve, reject) => {
    // Genera un string con el formato correcto de la temporada que hay que usar para la descarga
    const season = process.env.DOWNLOAD_SEASON;
    const results = [];
    const url = `${URL_DOWNLOAD_SERVER + season}/${competition}.csv`;
    console.log('DOWNLOAD', url);
    https.get(url, (data) => {
      data
        .pipe(csv())
        .on('data', (downloadedData) => results.push(formatData(downloadedData)))
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err));
    }).on('error', (err) => reject(err));
  });

  /**
    * Guarda los datos de la descarga en base de datos
    *
    */
  const saveDownloadInfo = (numInserts, errs) => {
    const objDownload = {
      date,
      executionTime: Date.now() - date.getTime(),
      numInserts,
      errs,
    };
    const download = new DownloadModel(objDownload);
    return download.save();
  };

  /**
    * Devuelve los datos de la última descarga ejecutada
    *
    */
  const getLastDownload = async () => {
    const lastDownload = await DownloadModel.find().sort({ _id: -1 }).limit(1);
    return lastDownload[0];
  };

  /**
    * Ejecuta la descarga de los partidos y los inserta en base de datos
    *
    */
  const executeDownload = async () => {
    try {
      // Competiciones a descargar
      const competitionService = CompetitionService();
      const competitions = await competitionService.getIds();
      if (!isArrayNotEmpty(competitions)) {
        throw new InvalidCompetititons('Array de competiciones vacío', competitions);
      }
      // Descarga e insercción de los partidos
      const matchService = MatchService();
      const downloadedPromises = competitions.map(async (competition) => downloadCsv(competition));
      const downloadedMatches = await Promise.all(downloadedPromises);
      const download = await matchService.insertMatches(flattenDeep(downloadedMatches));
      await saveDownloadInfo(download.length || 0);
    } catch (e) {
      if (e instanceof InvalidCompetititons) {
        await saveDownloadInfo(0, [e.getFormat()]);
      } else {
        // Me quedo solo con los errores que no sean 11000, Duplicate key entry
        const errs = e.writeErrors.filter((err) => err.code !== 11000);
        await saveDownloadInfo(e.insertedDocs.length || 0, errs);
      }
    }
  };

  return Object.freeze({
    getLastDownload,
    executeDownload,
  });
};

export default DownloadService;
