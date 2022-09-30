import { Howl } from "howler";
import { ChangeEvent, useEffect, useRef, useState } from "react";

function Test() {
  const [duration, setDuration] = useState(0);
  const soundRef = useRef(
    new Howl({
      src: ["/sounds/mixkit-rain-long-loop-2394.mp3"],
      html5: true,
      loop: true,
      volume: 0.5,
      onplay: () => console.log("playing!"),
      onpause: () => console.log("paused!"),
      onload: () => {
        setDuration(Math.floor(sound.duration()));
      },
      onseek: () => {
        console.log("hi");
      },
      onfade: () => {
        console.log("fade!");
      },
    })
  );

  const { current: sound } = soundRef;

  const timeoutRef = useRef<number | null>(null);

  const timelineInputRef = useRef<HTMLInputElement>(null);

  const onTimelineChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    // sound.seek(+value);
  };

  const togglePlayPause = () => {
    if (timeoutRef.current) return;
    if (sound.playing()) {
      sound.fade(1, 0, 500);

      timeoutRef.current = window.setTimeout(() => {
        sound.pause();
        timeoutRef.current = null;
      }, 500);
    } else {
      sound.fade(0, 1, 500);
      sound.play();
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;
      }, 500);
    }
    console.log(timeoutRef.current);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-7xl [&>*]:mb-9">
      <div onClick={togglePlayPause}>play</div>
      <input
        onChange={onTimelineChange}
        ref={timelineInputRef}
        type="range"
        min="0"
        max={duration}
        step="1"
        defaultValue="0"
      />
      <div>
        {duration}||
        {sound.volume()}
      </div>
    </div>
  );
}

export default Test;
