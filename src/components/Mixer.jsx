import { useState, useEffect, useRef } from "react";
import {
  loaded,
  Player,
  EQ3,
  Channel,
  Reverb,
  Chorus,
  Compressor,
  PitchShift,
  Chebyshev,
  FeedbackDelay,
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
  const choices = useRef([]);
  const eqs = useRef([]);
  const busOneChannel = useRef(null);
  const busTwoChannel = useRef(null);
  const [state, setState] = useState("stopped");
  const handleSetState = (value) => setState(value);
  const [isLoaded, setIsLoaded] = useState(false);

  const [busOneFxOneChoice, setBusOneFxOneChoice] = useState(null);
  const handleSetBusOneFxOneChoice = (value) => setBusOneFxOneChoice(value);
  const [busOneFxTwoChoice, setBusOneFxTwoChoice] = useState(null);
  const handleSetBusOneFxTwoChoice = (value) => setBusOneFxTwoChoice(value);
  const [busOneActive, setBusOneActive] = useState([]);

  const [busTwoFxOneChoice, setBusTwoFxOneChoice] = useState(null);
  const handleSetBusTwoFxOneChoice = (value) => setBusTwoFxOneChoice(value);
  const [busTwoFxTwoChoice, setBusTwoFxTwoChoice] = useState(null);
  const handleSetBusTwoFxTwoChoice = (value) => setBusTwoFxTwoChoice(value);
  const [busTwoActive, setBusTwoActive] = useState([]);

  useEffect(() => {
    // create audio nodes
    busOneChannel.current = new Channel().toDestination();
    busTwoChannel.current = new Volume().toDestination();
    busOneChannel.current.receive("busOne");

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

  // when busOneFxOneChoice is selected it initiates new FX
  choices.current = [
    busOneFxOneChoice,
    busOneFxTwoChoice,
    busTwoFxOneChoice,
    busTwoFxTwoChoice,
  ];

  const [busOneFxOneType, busOneFxTwoType, busTwoFxOneType, busTwoFxTwoType] =
    useSetFxType(choices.current);

  const [
    busOneFxOneControls,
    busOneFxTwoControls,
    busTwoFxOneControls,
    busTwoFxTwoControls,
  ] = useSetFxControls(
    choices.current,
    busOneFxOneType,
    busOneFxTwoType,
    busTwoFxOneType,
    busTwoFxTwoType
  );

  useEffect(() => {
    if (busOneFxOneChoice === "bs1-fx1") busOneFxOneType.disconnect();
    if (busOneFxOneType === null || busOneChannel.current === null) return;
    busOneChannel.current.connect(busOneFxOneType);
    return () => busOneFxOneType.disconnect();
  }, [busOneFxOneType, busOneFxOneChoice]);

  useEffect(() => {
    if (busOneFxTwoChoice === "bs1-fx2") busOneFxTwoType.disconnect();
    if (busOneFxTwoType === null || busOneChannel.current === null) return;
    busOneChannel.current.connect(busOneFxTwoType);
    return () => busOneFxTwoType.disconnect();
  }, [busOneFxTwoType, busOneFxTwoChoice]);

  useEffect(() => {
    if (busTwoFxOneChoice === "bs2-fx1") busTwoFxOneType.disconnect();
    if (busTwoFxOneType === null || busTwoChannel.current === null) return;
    busTwoChannel.current.connect(busTwoFxOneType);
    return () => busTwoFxOneType.disconnect();
  }, [busTwoFxOneType, busTwoFxOneChoice]);

  useEffect(() => {
    if (busTwoFxTwoChoice === "bs2-fx2") busTwoFxTwoType.disconnect();
    if (busTwoFxTwoType === null || busTwoChannel.current === null) return;
    busTwoChannel.current.connect(busTwoFxTwoType);
    return () => busTwoFxTwoType.disconnect();
  }, [busTwoFxTwoType, busTwoFxTwoChoice]);

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
          setBusTwoActive(busTwoActive);
          channels.current[id].connect(Destination);
          channels.current[id].disconnect(Destination);
          channels.current[id].connect(busTwoChannel.current);
        } else {
          busTwoActive[id] = false;
          setBusTwoActive(busTwoActive);
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
      {busOneFxOneControls}
      {busOneFxTwoControls}
      {busTwoFxOneControls}
      {busTwoFxTwoControls}
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
              state={state}
              toggleBusOne={toggleBusOne}
              toggleBusTwo={toggleBusTwo}
            />
          );
        })}
        <Bus1
          state={state}
          busOneActive={busOneActive}
          busOneChannel={busOneChannel.current}
          handleSetBusOneFxOneChoice={handleSetBusOneFxOneChoice}
          handleSetBusOneFxTwoChoice={handleSetBusOneFxTwoChoice}
        />
        <Bus2
          state={state}
          busTwoActive={busTwoActive}
          busTwoChannel={busTwoChannel.current}
          handleSetBusTwoFxOneChoice={handleSetBusTwoFxOneChoice}
          handleSetBusTwoFxTwoChoice={handleSetBusTwoFxTwoChoice}
        />
        <MasterVol state={state} />
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
