import { ISong } from './types';
import Elliot from './images/elliot-X2.jpg';
import Indiebox from './images/indiebox-folk-X2.png';
import CW from './images/cw-X2.png';
import Risian from './images/risian-X2.png';
import TwinsmusicRetro from './images/twinsmusic-retro-X2.png';
import BassBuzzer from './audio/bassbuzzer.mp3';
import PaperPlane from './audio/paperplane.mp3';
import ShouldaCoulda from './audio/shouldacoulda.mp3';
import League from './audio/league.mp3';
import NoHipNoHop from './audio/nohipnohop.mp3';

export const songs: ISong[] = [
  {
    src: BassBuzzer,
    cover: Elliot,
    name: 'Buss Buzzer',
  },
  {
    src: PaperPlane,
    cover: Indiebox,
    name: 'Paper Plane',
  },
  {
    src: ShouldaCoulda,
    cover: CW,
    name: 'Shoulda Coulda',
  },
  {
    src: League,
    cover: Risian,
    name: 'League',
  },
  {
    src: NoHipNoHop,
    cover: TwinsmusicRetro,
    name: 'No Hip, No Hop',
  },
];

export const defaultIconPrefix = 'fa-solid';
