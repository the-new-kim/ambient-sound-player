import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { IPlayerState, PlayerState } from "./atoms";
import Channel from "./components/Channel";

import Intro from "./components/Intro";

// const headerVariants: Variants = {
//   top: {
//     filter: "blur(0px)",
//   },
//   scrolled: {
//     filter: "blur(10px)",
//   },
// };

function App() {
  const [player, setPlayer] = useRecoilState(PlayerState);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const loadedChannels = player.channels.filter(
      (channel) => !channel.isLoading
    );

    if (loadedChannels.length !== player.channels.length) return;

    setIsDataLoading(false);
  }, [player]);

  useEffect(() => {
    if (isDataLoading) return;

    setPlayer((oldState) => {
      const newState: IPlayerState = { ...oldState, isDataLoading };
      return newState;
    });
  }, [isDataLoading, setPlayer]);

  return (
    <div
      className={`flex flex-col ${!isScrollable && "h-screen overflow-hidden"}`}
    >
      <Intro isDataLoading={isDataLoading} setIsScrollable={setIsScrollable} />
      {player.channels.map((channel, index) => (
        <section id={index + ""} className="z-50" key={"channel" + index}>
          <Channel {...channel} index={index} />
        </section>
      ))}
    </div>
  );
}

export default App;
