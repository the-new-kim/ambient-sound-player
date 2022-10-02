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

  // const [duration, setDuration] = useState(0);
  // const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(defaultVolume);
  const [isPlaying, setIsPlaying] = useState(defaultPlaying);
  // const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      audio.loop = true;
      audio.crossOrigin = "anonymous";
      // setDuration(Math.floor(audio.duration));
      //📝 On Safari canplay event is not fired....
      setPlayer((oldState) => {
        let channels = [...oldState.channels];
        const channel = { ...channels[index], isLoading: false };
        channels[index] = channel;
        const newState = { ...oldState, channels };
        return newState;
      });
    };

    // const handleEnded = () => {
    //   console.log("ended");
    //   setIsPlaying(false);
    // };

    // const handleTimeupdate = () => {
    //   setCurrentTime(Math.floor(audio.currentTime));
    // };

    // const handleCanPlayThrough = () => {
    //   console.log(index + "through!!!");

    //   setPlayer((oldState) => {
    //     let channels = [...oldState.channels];
    //     const channel = { ...channels[index], isLoading: false };
    //     channels[index] = channel;
    //     const newState = { ...oldState, channels };
    //     return newState;
    //   });
    // };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    // audio.addEventListener("ended", handleEnded);
    // audio.addEventListener("timeupdate", handleTimeupdate);
    // audio.addEventListener("canplaythrough", handleCanPlayThrough);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      // audio.removeEventListener("ended", handleEnded);
      // audio.removeEventListener("timeupdate", handleTimeupdate);
      // audio.removeEventListener("canplaythrough", handleCanPlayThrough);
    };
  }, [audio, index, setPlayer]);

  useEffect(() => {
    audio.volume = volume;
  }, [audio, volume]);

  useEffect(() => {
    isPlaying ? audio.play() : audio.pause();
  }, [audio, isPlaying]);

  // useEffect(() => {
  //   audio.playbackRate = playbackRate;
  // }, [audio, playbackRate]);

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

  // const onTimelineChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   audio.currentTime = +value;
  //   setCurrentTime(+value);
  // };

  // const onPlaybackRateChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const {
  //     target: { value },
  //   } = event;

  //   setPlaybackRate(+value);
  // };

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
          // color: isPlaying && volume ? "white" : "black",
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

      {/* <input
        onChange={onTimelineChange}
        type="range"
        min="0"
        max={duration}
        step="1"
        value={currentTime}
      />

      <input
        onChange={onPlaybackRateChange}
        type="range"
        min="0.5"
        max="1.5"
        step="0.1"
        value={playbackRate}
      /> */}
    </div>
  );
}

export default Channel;
