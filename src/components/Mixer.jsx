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

  const [fxChoices, setFxChoices] = useState([[], []]);
  const handleSetFxChoices = (value) => setFxChoices(value);
  const [activeBusses, setActiveBusses] = useState([[], []]);

  const [channels, eqs, isLoaded] = useChannelStrip({ tracks });

  const [fxControls] = useSetFxType(fxChoices, busChannels);

  function toggleBus(e) {
    const id = parseInt(e.target.id[3], 10);
    channels.current.forEach((channel, i) => {
      if (id === i) {
        if (e.target.checked) {
          activeBusses[i][id] = true;
          setActiveBusses([...activeBusses]);
          channels.current[e.target.name].connect(Destination);
          channels.current[e.target.name].disconnect(Destination);
          channels.current[e.target.name].connect(busChannels.current[i]);
        } else {
          activeBusses[i][id] = false;
          setActiveBusses([...activeBusses]);
          channels.current[e.target.name].connect(busChannels.current[i]);
          channels.current[e.target.name].disconnect(busChannels.current[i]);
          channels.current[e.target.name].connect(Destination);
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
            fxChoices={fxChoices}
            handleSetFxChoices={handleSetFxChoices}
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
