import { Moment } from 'moment';

export interface NextGame {
  sysid: number;
  gamenumber: number;
  division: string;
  gamedate: string;
  gametime: string;
  gametype: string;
  gametypename: string;
  gametypeshortname: string;
  field: string;
  fieldnumber: string;
  fieldmapurl: string;
  fieldaddress: string;
  home: string;
  away: string;
  position: string;
}