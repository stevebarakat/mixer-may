import { useState, useRef } from "react";
import { Destination, Volume } from "tone";
import Controls from "./Transport/Controls";

import MasterVol from "./Channels/MasterVol";
import Bus from "./Channels/Bus";
import ChannelStrip from "./Channels/ChannelStrip";
import Loader from "./Loader";
import useSetFxType from "../hooks/useSetFxType";
import useChannelStrip from "../hooks/useChannelStrip";

function Mixer({ song }) {
  const tracks = song.tracks;
  const busChannels = useRef([
    new Volume().toDestination(),
    new Volume().toDestination(),
  ]);

  const [busChoices, setBusChoices] = useState([]);
  const handleSetBusChoices = (value) => setBusChoices(value);
  const [busOneActive, setBusOneActive] = useState([]);

  const [channels, eqs, isLoaded] = useChannelStrip({ tracks });

  const [fxControls] = useSetFxType(busChoices, busChannels);

  function toggleBusOne(e) {
    const id = parseInt(e.target.id[0], 10);
    const name = e.target.name;
    channels.current.forEach((channel, i) => {
      if (id === i) {
        console.log("name", busChannels.current[name]);
        if (e.target.checked) {
          busOneActive[id] = true;
          setBusOneActive([...busOneActive]);
          channels.current[id].connect(Destination);
          channels.current[id].disconnect(Destination);
          channels.current[id].connect(busChannels.current[name]);
        } else {
          busOneActive[id] = false;
          setBusOneActive([...busOneActive]);
          channels.current[id].connect(busChannels.current[name]);
          channels.current[id].disconnect(busChannels.current[name]);
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
        {busChannels.current.map((busChannel, i) => (
          <Bus
            key={`busChannel${i}`}
            busOneActive={busOneActive}
            busChannel={busChannel}
            busChoices={busChoices}
            handleSetBusChoices={handleSetBusChoices}
          />
        ))}
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
