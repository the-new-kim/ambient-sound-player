import { useRecoilValue } from "recoil";
import { ChannelsState } from "./atoms";
import Channel from "./components/Channel";

function App() {
  const channels = useRecoilValue(ChannelsState);
  return (
    <section>
      <div className="text-center text-8xl pt-6 mb-6">Ambient Sound Player</div>
      <div className="max-w-screen-lg m-auto grid grid-cols-3 gap-6 p-10 text-5xl">
        {channels.map((channel, index) => (
          <Channel key={"channel" + index} {...channel} />
        ))}
      </div>
    </section>
  );
}

export default App;
