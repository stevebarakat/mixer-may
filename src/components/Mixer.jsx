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
  const [activeBusses, setActiveBusses] = useState([[], []]);

  const [channels, eqs, isLoaded] = useChannelStrip({ tracks });

  const [fxControls] = useSetFxType(busChoices, busChannels);

  function toggleBus(e) {
    console.log("e.target.name", e.target.name);
    const id = parseInt(e.target.id[3], 10);
    channels.current.forEach((channel, i) => {
      if (id === i) {
        if (e.target.checked) {
          activeBusses[i][id] = true;
          setActiveBusses([...activeBusses]);
          channels.current[e.target.name].connect(busChannels.current[i]);
        } else {
          activeBusses[i][id] = false;
          setActiveBusses([...activeBusses]);
          channels.current[e.target.name].connect(Destination);
        }
      }
    });
    console.log("activeBusses", activeBusses);
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
              toggleBus={toggleBus}
              busChannels={busChannels.current}
            />
          );
        })}
        {busChannels.current.map((busChannel, i) => (
          <Bus
            index={i}
            key={`busChannel${i}`}
            activeBusses={activeBusses[i]}
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
