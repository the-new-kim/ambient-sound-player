import { atom } from "recoil";
import rainSrc from "./assets/sounds/mixkit-long-rain-ambience-1247.mp3";
import thunderSrc from "./assets/sounds/thunder.mp3";
import fireSrc from "./assets/sounds/mixkit-campfire-crackles-1330.mp3";
import seaSrc from "./assets/sounds/mixkit-small-waves-harbor-rocks-1208.mp3";
import windSrc from "./assets/sounds/mixkit-wild-light-wind-1733.mp3";
import birdsSrc from "./assets/sounds/mixkit-forest-birds-ambience-1210.mp3";
import playgroundSrc from "./assets/sounds/mixkit-busy-park-playground-with-kids-playing-2264.mp3";
import heartbeatSrc from "./assets/sounds/mixkit-slow-heartbeat-494.mp3";
import hotelSrc from "./assets/sounds/mixkit-hotel-lobby-with-dining-area-ambience-453.mp3";
import drumSrc from "./assets/sounds/mixkit-cinematic-ancient-drums-heartbeat-487.mp3";
import radarPingSrc from "./assets/sounds/mixkit-airport-radar-ping-1582.mp3";
import cricketsSrc from "./assets/sounds/mixkit-crickets-near-the-river-2459.mp3";

export interface IChannel {
  title: string;
  audioSrc: string;
  defaultVolume: number;
  defaultPlaying: boolean;
  isPlaying: boolean;
  isLoading: boolean;
}

export interface IPlayerState {
  channels: IChannel[];
  isDataLoading: boolean;
}

//====> defaultChannels
const defaultChannels: IChannel[] = [
  {
    title: "Rain",
    audioSrc: rainSrc,
    defaultVolume: 0.5,
    defaultPlaying: false,
    isPlaying: false,
    isLoading: true,
  },
  {
    title: "Thunder",
    audioSrc: thunderSrc,
    defaultVolume: 0.5,
    defaultPlaying: false,
    isPlaying: false,
    isLoading: true,
  },
  {
    title: "Fire",
    audioSrc: fireSrc,
    defaultVolume: 0.5,
    defaultPlaying: false,
    isPlaying: false,
    isLoading: true,
  },

  {
    title: "Sea",
    audioSrc: seaSrc,
    defaultVolume: 0.5,
    defaultPlaying: false,
    isPlaying: false,
    isLoading: true,
  },
  {
    title: "Wind",
    audioSrc: windSrc,
    defaultVolume: 0.5,
    defaultPlaying: false,
    isPlaying: false,
    isLoading: true,
  },

  {
    title: "Birds",
    audioSrc: birdsSrc,
    defaultVolume: 0.5,
    defaultPlaying: false,
    isPlaying: false,
    isLoading: true,
  },
  {
    title: "Crickets",
    audioSrc: cricketsSrc,
    defaultVolume: 0.5,
    defaultPlaying: false,
    isPlaying: false,
    isLoading: true,
  },

  {
    title: "Playground",
    audioSrc: playgroundSrc,
    defaultVolume: 0.5,
    defaultPlaying: false,
    isPlaying: false,
    isLoading: true,
  },

  {
    title: "Hotel",
    audioSrc: hotelSrc,
    defaultVolume: 0.5,
    defaultPlaying: false,
    isPlaying: false,
    isLoading: true,
  },
  {
    title: "Heart beat",
    audioSrc: heartbeatSrc,
    defaultVolume: 0.5,
    defaultPlaying: false,
    isPlaying: false,
    isLoading: true,
  },

  {
    title: "Drum",
    audioSrc: drumSrc,
    defaultVolume: 0.5,
    defaultPlaying: false,
    isPlaying: false,
    isLoading: true,
  },

  {
    title: "Radar ping",
    audioSrc: radarPingSrc,
    defaultVolume: 0.5,
    defaultPlaying: false,
    isPlaying: false,
    isLoading: true,
  },
];

const defaultPlayerState: IPlayerState = {
  channels: defaultChannels,
  isDataLoading: true,
};

// export const ChannelsState = atom<IChannel[]>({
//   key: "channels",
//   default: defaultChannelsState,
// });

export const PlayerState = atom<IPlayerState>({
  key: "player",
  default: defaultPlayerState,
});
