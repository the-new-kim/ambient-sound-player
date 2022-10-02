import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { IChannel, PlayerState } from "../atoms";

interface IChannelProps extends IChannel {
  index: number;
}

function Channel({
  title,
  audioSrc,
  defaultVolume,
  defaultPlaying,
  index,
}: IChannelProps) {
  const setPlayer = useSetRecoilState(PlayerState);
  const audioRef = useRef<HTMLAudioElement>(new Audio(audioSrc));
  const { current: audio } = audioRef;

  const [volume, setVolume] = useState(defaultVolume);
  const [isPlaying, setIsPlaying] = useState(defaultPlaying);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      audio.loop = true;
      audio.crossOrigin = "anonymous";

      //📝 On Safari canplay event is not fired....
      setPlayer((oldState) => {
        let channels = [...oldState.channels];
        const channel = { ...channels[index], isLoading: false };
        channels[index] = channel;
        const newState = { ...oldState, channels };
        return newState;
      });
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audio, index, setPlayer]);

  useEffect(() => {
    audio.volume = volume;
  }, [audio, volume]);

  useEffect(() => {
    isPlaying ? audio.play() : audio.pause();
  }, [audio, isPlaying]);

  useEffect(() => {
    setPlayer((oldState) => {
      let channels = [...oldState.channels];
      const channel: IChannel = { ...channels[index], isPlaying };
      channels.splice(index, 1, channel);

      const newState = { ...oldState, channels };

      return newState;
    });
  }, [setPlayer, isPlaying]);

  const togglePlayPause = () => {
    if (audio.paused) {
      volume === 0 && setVolume(defaultVolume);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const onVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setVolume(+value);
    +value === 0 ? setIsPlaying(false) : setIsPlaying(true);
  };

  return (
    <div className="w-full h-full flex justify-center flex-col items-center [&>*]:mb-9 [&>*]:cursor-pointer">
      <div className="select-none" onClick={togglePlayPause}>
        {title.split("").map((letter, index) => (
          <span
            key={title + index}
            style={{
              color:
                isPlaying && volume
                  ? "rgba(242,242,242,1)"
                  : "rgba(122,122,122,1)",
              textShadow:
                isPlaying && volume
                  ? `0 0 3px rgba(242,242,242,0.9),
                    0 0 ${volume * 5}px rgba(242,242,242,0.8), 
                    0 0 ${volume * 20}px rgba(242,242,242,0.7), 
                    0 0 ${volume * 30}px rgba(242,242,242,0.6),
                    3px 3px 4px rgba(0,0,0,0.8)`
                  : `3px 3px 4px rgba(0,0,0,0.8)`,
              transition: `text-shadow ease-out 300ms ${30 * index}ms,
                            color ease-out 300ms ${30 * index}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      <input
        className="hidden md:block"
        style={{
          boxShadow:
            isPlaying && volume
              ? `0 0 3px rgba(242,242,242,0.8),
              0 0 ${volume * 5}px rgba(242,242,242,0.7), 
              0 0 ${volume * 20}px rgba(242,242,242,0.6), 
              0 0 ${volume * 30}px rgba(242,242,242,0.5),
              3px 3px 4px rgba(0,0,0,0.8)`
              : `3px 3px 4px rgba(0,0,0,0.8)`,
          transition: `box-shadow ease-out 300ms ${30 * index}ms`,
        }}
        onChange={onVolumeChange}
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={isPlaying ? volume : 0}
      />
    </div>
  );
}

export default Channel;
