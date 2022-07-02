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
import Delay from "./FX/Delay";
import Reverber from "./FX/Reverb";
import Choruser from "./FX/Chorus";
import PitchShifter from "./FX/PitchShift";
import Compress from "./FX/Compressor";
import MasterVol from "./Channels/MasterVol";
import Bus1 from "./Channels/Bus1";
import Bus2 from "./Channels/Bus2";
import ChannelStrip from "./Channels/ChannelStrips";
import Loader from "./Loader";
import Chebyshever from "./FX/Chebyshev";
import useSetFxType from "../hooks/useSetFxType";

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
  const [busOneFxOneControls, setBusOneFxOneControls] = useState(null);
  const [busOneFxTwoControls, setBusOneFxTwoControls] = useState(null);

  const [busTwoFxOneChoice, setBusTwoFxOneChoice] = useState(null);
  const handleSetBusTwoFxOneChoice = (value) => setBusTwoFxOneChoice(value);
  const [busTwoFxTwoChoice, setBusTwoFxTwoChoice] = useState(null);
  const handleSetBusTwoFxTwoChoice = (value) => setBusTwoFxTwoChoice(value);
  const [busTwoActive, setBusTwoActive] = useState([]);
  const [busTwoFxOneControls, setBusTwoFxOneControls] = useState(null);
  const [busTwoFxTwoControls, setBusTwoFxTwoControls] = useState(null);

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

  useEffect(() => {
    choices.current.forEach((choice, index) => {
      const i = index + 1;
      switch (choice) {
        case "bs1-fx1":
          setBusOneFxOneControls(null);
          break;
        case "bs1-fx2":
          setBusOneFxTwoControls(null);
          break;
        case "bs2-fx1":
          setBusTwoFxOneControls(null);
          break;
        case "bs2-fx2":
          setBusTwoFxTwoControls(null);
          break;
        case "delay":
          i === 1 &&
            setBusOneFxOneControls(<Delay controls={busOneFxOneType} />);
          i === 2 &&
            setBusOneFxTwoControls(<Delay controls={busOneFxTwoType} />);
          i === 3 &&
            setBusTwoFxOneControls(<Delay controls={busTwoFxOneType} />);
          i === 4 &&
            setBusTwoFxTwoControls(<Delay controls={busTwoFxTwoType} />);
          break;
        case "reverb":
          i === 1 &&
            setBusOneFxOneControls(<Reverber controls={busOneFxOneType} />);
          i === 2 &&
            setBusOneFxTwoControls(<Reverber controls={busOneFxTwoType} />);
          i === 3 &&
            setBusTwoFxOneControls(<Reverber controls={busTwoFxOneType} />);
          i === 4 &&
            setBusTwoFxTwoControls(<Reverber controls={busTwoFxTwoType} />);
          break;
        case "chebyshev":
          i === 1 &&
            setBusOneFxOneControls(<Chebyshever controls={busOneFxOneType} />);
          i === 2 &&
            setBusOneFxTwoControls(<Chebyshever controls={busOneFxTwoType} />);
          i === 3 &&
            setBusTwoFxOneControls(<Chebyshever controls={busTwoFxOneType} />);
          i === 4 &&
            setBusTwoFxTwoControls(<Chebyshever controls={busTwoFxTwoType} />);
          break;
        case "pitch-shift":
          i === 1 &&
            setBusOneFxOneControls(<PitchShifter controls={busOneFxOneType} />);
          i === 2 &&
            setBusOneFxTwoControls(<PitchShifter controls={busOneFxTwoType} />);
          i === 3 &&
            setBusTwoFxOneControls(<PitchShifter controls={busTwoFxOneType} />);
          i === 4 &&
            setBusTwoFxTwoControls(<PitchShifter controls={busTwoFxTwoType} />);
          break;
        case "chorus":
          i === 1 &&
            setBusOneFxOneControls(<Choruser controls={busOneFxOneType} />);
          i === 2 &&
            setBusOneFxTwoControls(<Choruser controls={busOneFxTwoType} />);
          i === 3 &&
            setBusTwoFxOneControls(<Choruser controls={busTwoFxOneType} />);
          i === 4 &&
            setBusTwoFxTwoControls(<Choruser controls={busTwoFxTwoType} />);
          break;
        case "compressor":
          i === 1 &&
            setBusOneFxOneControls(<Compress controls={busOneFxOneType} />);
          i === 2 &&
            setBusOneFxTwoControls(<Compress controls={busOneFxTwoType} />);
          i === 3 &&
            setBusTwoFxOneControls(<Compress controls={busTwoFxOneType} />);
          i === 4 &&
            setBusTwoFxTwoControls(<Compress controls={busTwoFxTwoType} />);
          break;
        default:
          break;
      }
    });
  }, [
    busOneFxOneChoice,
    busOneFxOneType,
    busOneFxTwoChoice,
    busOneFxTwoType,
    busTwoFxOneChoice,
    busTwoFxOneType,
    busTwoFxTwoChoice,
    busTwoFxTwoType,
  ]);

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
