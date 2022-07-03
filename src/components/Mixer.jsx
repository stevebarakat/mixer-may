import { useState, useEffect, useRef } from "react";
import {
  loaded,
  Player,
  EQ3,
  Channel,
  Transport as t,
  Destination,
  Volume,
} from "tone";
import Controls from "./Transport/Controls";

import MasterVol from "./Channels/MasterVol";
import Bus1 from "./Channels/Bus1";
import Bus2 from "./Channels/Bus2";
import ChannelStrip from "./Channels/ChannelStrips";
import Loader from "./Loader";
import useSetFxType from "../hooks/useSetFxType";
import useSetFxControls from "../hooks/useSetFxControls";

function Mixer({ song }) {
  const tracks = song.tracks;
  const channels = useRef([]);
  const players = useRef([]);
  const eqs = useRef([]);
  const busOneChannel = useRef(null);
  const busTwoChannel = useRef(null);
  const [state, setState] = useState("stopped");
  const handleSetState = (value) => setState(value);
  const [isLoaded, setIsLoaded] = useState(false);

  const [busChoices, setBusChoices] = useState([]);
  const handleSetBusChoices = (value) => setBusChoices(value);
  const [busOneActive, setBusOneActive] = useState([]);
  const [busTwoActive, setBusTwoActive] = useState([]);

  useEffect(() => {
    // create audio nodes
    busOneChannel.current = new Volume().toDestination();
    busTwoChannel.current = new Volume().toDestination();

    for (let i = 0; i < tracks.length; i++) {
      eqs.current = [...eqs.current, new EQ3()];
      channels.current = [
        ...channels.current,
        new Channel(tracks[i].volume, tracks[i].pan).connect(Destination),
      ];
      players.current = [...players.current, new Player(tracks[i].path)];
    }

    // connect everything
    players.current.forEach((player, i) =>
      player.chain(eqs.current[i], channels.current[i]).sync().start()
    );

    return () => {
      t.stop();
      players.current.forEach((player, i) => {
        player.disconnect();
        eqs.current[i].disconnect();
        channels.current[i].disconnect();
      });
      players.current = [];
      eqs.current = [];
      channels.current = [];
    };
  }, [tracks]);

  useEffect(() => {
    loaded().then(() => setIsLoaded(true));
  }, [setIsLoaded]);

  console.log("busChoices", busChoices);

  const [fxTypes, fxControls] = useSetFxType(busChoices);

  // const [fxControls] = useSetFxControls(busChoices, fxTypes);

  useEffect(() => {
    busChoices.forEach((choice, i) => {
      if (choice === `bs${i + 1}-fx${i + 1}`) fxTypes[i].dispose();
      if (fxTypes[i] === null || busOneChannel.current === null) return;
      busOneChannel.current.connect(fxTypes[i]);
      return () => fxTypes[i].dispose();
    });
  }, [fxTypes, busChoices]);

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
          channels.current[id].disconnect(busOneChannel.current);
          channels.current[id].connect(Destination);
        }
      }
    });
  }

  function toggleBusTwo(e) {
    const id = parseInt(e.target.id[0], 10);
    channels.current.forEach((channel, i) => {
      if (id === i) {
        if (e.target.checked) {
          busTwoActive[id] = true;
          // setBusTwoActive(busTwoActive);
          channels.current[id].connect(Destination);
          channels.current[id].disconnect(Destination);
          channels.current[id].connect(busTwoChannel.current);
        } else {
          busTwoActive[id] = false;
          // setBusTwoActive(busTwoActive);
          channels.current[id].connect(busTwoChannel.current);
          channels.current[id].disconnect(busTwoChannel.current);
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
              toggleBusTwo={toggleBusTwo}
            />
          );
        })}
        <Bus1
          busOneActive={busOneActive}
          busOneChannel={busOneChannel.current}
          busChoices={busChoices}
          handleSetBusChoices={handleSetBusChoices}
        />
        {fxControls.map((control, i) => (
          <div key={i}>{control}</div>
        ))}
        <Bus2
          busTwoActive={busTwoActive}
          busTwoChannel={busTwoChannel.current}
          handleSetBusChoices={handleSetBusChoices}
        />
        <MasterVol />
      </div>
      <div className="controls-wrap">
        <div className="controls-well">
          <Controls song={song} state={state} handleSetState={handleSetState} />
        </div>
      </div>
    </div>
  );
}

export default Mixer;
