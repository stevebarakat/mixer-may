import { useState, useRef } from "react";
import { Destination, Volume } from "tone";
import Controls from "./Transport/Controls";

import MasterVol from "./Channels/MasterVol";
import Bus1 from "./Channels/Bus1";
import ChannelStrip from "./Channels/ChannelStrips";
import Loader from "./Loader";
import useSetFxType from "../hooks/useSetFxType";
import useChannelStrip from "../hooks/useChannelStrip";

function Mixer({ song }) {
  const tracks = song.tracks;
  const busOneChannel = useRef(new Volume().toDestination());

  const [busChoices, setBusChoices] = useState([]);
  const handleSetBusChoices = (value) => setBusChoices(value);
  const [busOneActive, setBusOneActive] = useState([]);

  const [channels, eqs, isLoaded] = useChannelStrip({ tracks });

  const [fxControls] = useSetFxType(busChoices, busOneChannel);

  function toggleBusOne(e) {
    const id = parseInt(e.target.id[0], 10);
    channels.current.forEach((channel, i) => {
      if (id === i) {
        if (e.target.checked) {
          busOneActive[id] = true;
          setBusOneActive([...busOneActive]);
          channels.current[id].connect(Destination);
          channels.current[id].disconnect(Destination);
          channels.current[id].connect(busOneChannel.current);
        } else {
          busOneActive[id] = false;
          setBusOneActive([...busOneActive]);
          channels.current[id].connect(busOneChannel.current);
          channels.current[id].disconnect(busOneChannel.current);
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
        <Bus1
          busOneActive={busOneActive}
          busOneChannel={busOneChannel.current}
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
