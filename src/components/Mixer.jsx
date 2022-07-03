import { useState, useRef } from "react";
import { Destination, Volume } from "tone";
import Controls from "./Transport/Controls";

import MasterVol from "./Channels/MasterVol";
import Bus from "./Channels/Bus";
import ChannelStrip from "./Channels/ChannelStrips";
import Loader from "./Loader";
import useSetFxType from "../hooks/useSetFxType";
import useChannelStrip from "../hooks/useChannelStrip";

function Mixer({ song }) {
  const tracks = song.tracks;
  const busChannels = useRef(new Volume().toDestination());

  const [busChoices, setBusChoices] = useState([]);
  const handleSetBusChoices = (value) => setBusChoices(value);
  const [bussesActive, setBussesActive] = useState([]);

  const [channels, eqs, isLoaded] = useChannelStrip({ tracks });

  const [fxControls] = useSetFxType(busChoices, busChannels);

  function toggleBusOne(e) {
    const id = parseInt(e.target.id[0], 10);
    channels.current.forEach((channel, i) => {
      if (id === i) {
        if (e.target.checked) {
          bussesActive[id] = true;
          setBussesActive([...bussesActive]);
          channels.current[id].connect(Destination);
          channels.current[id].disconnect(Destination);
          channels.current[id].connect(busChannels.current);
        } else {
          bussesActive[id] = false;
          setBussesActive([...bussesActive]);
          channels.current[id].disconnect(busChannels.current);
          channels.current[id].connect(Destination);
        }
      }
    });
  }

  // wait for the buffers to load
  return isLoaded === false ? (
    <div className="loader-wrap">
      <span>
        Loading: {song.artist} - {song.name}{" "}
      </span>
      <Loader />
    </div>
  ) : (
    <div className="console">
      {fxControls.map((control, i) => (
        <div key={i}>{control}</div>
      ))}
      <div className="mixer">
        {tracks.map((track, i) => {
          return (
            <ChannelStrip
              key={track.path}
              index={i}
              channel={channels.current[i]}
              eq={eqs.current[i]}
              track={track}
              tracks={tracks}
              toggleBusOne={toggleBusOne}
            />
          );
        })}
        <Bus
          bussesActive={bussesActive}
          busChannels={busChannels.current}
          busChoices={busChoices}
          handleSetBusChoices={handleSetBusChoices}
        />
        <MasterVol />
      </div>
      <div className="controls-wrap">
        <div className="controls-well">
          <Controls song={song} />
        </div>
      </div>
    </div>
  );
}

export default Mixer;
