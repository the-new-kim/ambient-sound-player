import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IChannel } from "../atoms";

function Channel({ title, audioUrl, defaultVolume, defaultPlaying }: IChannel) {
  const [audio, setAudio] = useState(new Audio(audioUrl));
  const [newAudio, setNewAudio] = useState(new Audio(audioUrl));
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(defaultVolume);
  const [isPlaying, setIsPlaying] = useState(defaultPlaying);

  const volumeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      audio.crossOrigin = "anonymous";
      setDuration(Math.floor(audio.duration));
    };

    const handleEnede = () => {
      console.log("ended");

      // setIsPlaying(false);
    };

    const handleTimeupdate = () => {
      setCurrentTime(Math.floor(audio.currentTime));

      //❓ Here I tried to imitate cross fade, but I am not sure is this the right way or not...
      if (Math.floor(audio.currentTime) === Math.floor(audio.duration) - 4) {
        if (!newAudio.paused) return;
        newAudio.play();

        setAudio(newAudio);
        setNewAudio(new Audio(audioUrl));

        console.log("hi");
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnede);
    audio.addEventListener("timeupdate", handleTimeupdate);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnede);
      audio.removeEventListener("timeupdate", handleTimeupdate);
    };
  }, [audio]);

  useEffect(() => {
    audio.volume = volume;
    if (!volumeInputRef.current) return;
    volumeInputRef.current.value = isPlaying ? volume + "" : "0";
  }, [audio, volume, isPlaying]);

  const togglePlayPause = () => {
    if (audio.paused) {
      audio.play();

      setIsPlaying(true);
    } else {
      audio.pause();

      setIsPlaying(false);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setVolume(+value);
    if (!audio.paused) return;
    if (+value === 0) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-full h-full flex justify-center flex-col items-center">
      <div
        className="cursor-pointer mb-4 select-none"
        onClick={togglePlayPause}
      >
        {title.split("").map((letter, index) => (
          <span
            key={title + index}
            style={{
              color: isPlaying && volume ? "white" : "black",
              textShadow:
                isPlaying && volume
                  ? ` 0 0 5px white,
                    0 0 ${volume * 5}px white, 
                    0 0 ${volume * 20}px white, 
                    0 0 ${volume * 30}px white`
                  : `1px 1px 2px black`,
              transition: `text-shadow ease-out 300ms ${
                30 * index
              }ms, color ease-out 300ms ${30 * index}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      <input
        ref={volumeInputRef}
        onChange={onChange}
        type="range"
        min="0"
        max="1"
        step="0.1"
        defaultValue={volume}
      />

      <div>
        {currentTime}/ {duration}
      </div>

      <input
        onChange={(event) => {
          audio.currentTime = +event.target.value;
        }}
        type="range"
        min="0"
        max={duration}
        step="1"
        defaultValue="0"
      />
    </div>
  );
}

export default Channel;
