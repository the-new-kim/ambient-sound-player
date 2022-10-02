import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { IPlayerState, PlayerState } from "./atoms";

import Channel from "./components/Channel";
import Intro from "./components/Intro";

function App() {
  const [player, setPlayer] = useRecoilState(PlayerState);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    console.log(player);
    if (!isDataLoading) return;

    const loadedChannels = player.channels.filter(
      (channel) => !channel.isLoading
    );

    if (loadedChannels.length !== player.channels.length) return;

    setTimeout(() => {
      setIsDataLoading(false);
    }, 3000);
  }, [player, isDataLoading]);

  useEffect(() => {
    if (isDataLoading) return;

    setPlayer((oldState) => {
      const newState: IPlayerState = { ...oldState, isDataLoading };
      return newState;
    });
  }, [isDataLoading, setPlayer]);

  return (
    <div
      className={`flex flex-col ${isDataLoading && "h-screen overflow-hidden"}`}
    >
      <Intro isDataLoading={isDataLoading} />
      {player.channels.map((channel, index) => (
        <section
          id={index + ""}
          className="z-40 min-h-fit py-10"
          key={"channel" + index}
        >
          <Channel {...channel} index={index} />
        </section>
      ))}
    </div>
  );
}

export default App;
