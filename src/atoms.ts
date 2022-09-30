import { atom } from "recoil";

export interface IChannel {
  title: string;
  audioUrl: string;
  defaultVolume: number;
  defaultPlaying: boolean;
}

const defaultChannelsState: IChannel[] = [
  {
    title: "Crickets",
    audioUrl: "/sounds/mixkit-night-crickets-near-the-swamp-1782.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },
  {
    title: "Playground",
    audioUrl: "/sounds/mixkit-busy-park-playground-with-kids-playing-2264.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },
  {
    title: "Birds",
    audioUrl: "/sounds/mixkit-forest-birds-ambience-1210.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },
  {
    title: "Wind",
    audioUrl: "/sounds/mixkit-wild-light-wind-1733.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },
  {
    title: "Rain",
    audioUrl: "/sounds/rain.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },
  {
    title: "Thunder",
    audioUrl: "/sounds/thunder.mp3",
    defaultVolume: 0.5,
    defaultPlaying: false,
  },
];
export const ChannelsState = atom<IChannel[]>({
  key: "channels",
  default: defaultChannelsState,
});
