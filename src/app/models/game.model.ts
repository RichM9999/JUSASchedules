import { Moment } from 'moment';

export interface Game {
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
  crid: number;
  centername: string;
  centerspecial: boolean;
  cremail: string;
  crstatus: string;
  crstatusname: string;
  crupdatedon: string;
  centersincesignup: string;
  crmaxmcenter: number;
  crmaxfcenter: number;
  crmaxmcentersignature: number;
  crmaxfcentersignature: number;
  crsingle: boolean;
  ar1id: number;
  ar1name: string;
  ar1special: boolean;
  ar1email: string;
  ar1status: string;
  ar1statusname: string;
  ar1updatedon: string;
  ar1sincesignup: string;
  ar1maxmar: number;
  ar1maxfar: number;
  ar1maxmarsignature: number;
  ar1maxfarsignature: number;
  ar1twoman: boolean;
  ar2id: number;
  ar2name: string;
  ar2special: boolean;
  ar2email: string;
  ar2status: string;
  ar2statusname: string;
  ar2updatedon: string;
  ar2sincesignup: string;
  ar2maxmar: number;
  ar2maxfar: number;
  ar2maxmarsignature: number;
  ar2maxfarsignature: number;
  ar2twoman: boolean;
  numberofrefs: number;
  stampupdatedon: string;
  nonjusafield: boolean;
  gamenotes: {
    postedbyid: number;
    postedby: string;
    message: string;
    postedon: string;
  }
}