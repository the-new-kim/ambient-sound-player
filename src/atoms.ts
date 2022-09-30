import { atom } from "recoil";

export interface IChannel {
  title: string;
  audioSrc: string;
  defaultVolume: number;
  defaultPlaying: boolean;
}

const defaultChannelsState: IChannel[] = [
  {
    title: "Rain",
    audioSrc: "/sounds/mixkit-long-rain-ambience-1247.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },
  {
    title: "Thunder",
    audioSrc: "/sounds/thunder.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },
  {
    title: "Fire",
    audioSrc: "/sounds/mixkit-campfire-crackles-1330.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },

  {
    title: "Sea",
    audioSrc: "/sounds/mixkit-small-waves-harbor-rocks-1208.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },
  {
    title: "Wind",
    audioSrc: "/sounds/mixkit-wild-light-wind-1733.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },

  {
    title: "Birds",
    audioSrc: "/sounds/mixkit-forest-birds-ambience-1210.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },
  {
    title: "Crickets",
    audioSrc: "/sounds/mixkit-crickets-near-the-river-2459.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },

  {
    title: "Playground",
    audioSrc: "/sounds/mixkit-busy-park-playground-with-kids-playing-2264.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },

  {
    title: "Hotel",
    audioSrc: "/sounds/mixkit-hotel-lobby-with-dining-area-ambience-453.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },
  {
    title: "Heart beat",
    audioSrc: "/sounds/mixkit-slow-heartbeat-494.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },

  {
    title: "Drum",
    audioSrc: "/sounds/mixkit-cinematic-ancient-drums-heartbeat-487.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },

  {
    title: "Radar ping",
    audioSrc: "/sounds/mixkit-airport-radar-ping-1582.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },
];
export const ChannelsState = atom<IChannel[]>({
  key: "channels",
  default: defaultChannelsState,
});
