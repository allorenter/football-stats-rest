import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  Division: String,
  Date: String,
  Time: String,
  HomeTeam: String,
  AwayTeam: String,
  FTHG: Number,
  FTAG: Number,
  FTR: String,
  HTHG: Number,
  HTAG: Number,
  HTR: String,
  HS: Number,
  AS: Number,
  HST: Number,
  AST: Number,
  HF: Number,
  AF: Number,
  HC: Number,
  AC: Number,
  HY: Number,
  AY: Number,
  HR: Number,
  AR: Number,
  B365H: Number,
  B365D: Number,
  B365A: Number,
  BWH: Number,
  BWD: Number,
  BWA: Number,
  IWH: Number,
  IWD: Number,
  IWA: Number,
  PSH: Number,
  PSD: Number,
  PSA: Number,
  WHH: Number,
  WHD: Number,
  WHA: Number,
  VCH: Number,
  VCD: Number,
  VCA: Number,
  MaxH: Number,
  MaxD: Number,
  MaxA: Number,
  AvgH: Number,
  AvgD: Number,
  AvgA: Number,
  B365O25: Number,
  B365U25: Number,
  PO25: Number,
  PU25: Number,
  MaxO25: Number,
  MaxU25: Number,
  AvgO25: Number,
  AvgU25: Number,
  AHh: Number,
  B365AHH: Number,
  B365AHA: Number,
  PAHH: Number,
  PAHA: Number,
  MaxAHH: Number,
  MaxAHA: Number,
  AvgAHH: Number,
  AvgAHA: Number,
  B365CH: Number,
  B365CD: Number,
  B365CA: Number,
  BWCH: Number,
  BWCD: Number,
  BWCA: Number,
  IWCH: Number,
  IWCD: Number,
  IWCA: Number,
  PSCH: Number,
  PSCD: Number,
  PSCA: Number,
  WHCH: Number,
  WHCD: Number,
  WHCA: Number,
  VCCH: Number,
  VCCD: Number,
  VCCA: Number,
  MaxCH: Number,
  MaxCD: Number,
  MaxCA: Number,
  AvgCH: Number,
  AvgCD: Number,
  AvgCA: Number,
  B365CO25: Number,
  B365CU25: Number,
  PCO25: Number,
  PCU25: Number,
  MaxCO25: Number,
  MaxCU25: Number,
  AvgC025: Number,
  AvgCU25: Number,
  AHCh: Number,
  B365CAHH: Number,
  B365CAHA: Number,
  PCAHH: Number,
  PCAHA: Number,
  MaxCAHH: Number,
  MaxCAHA: Number,
  AvgCAHH: Number,
  AvgCAHA: Number,
});

MatchSchema.index({ Division: 1, Date: 1, HomeTeam: 1, AwayTeam: 1}, { unique: true });

export default mongoose.model("matches", MatchSchema);