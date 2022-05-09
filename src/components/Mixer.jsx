import { useState, useEffect, useRef, useCallback } from "react";
import { loaded, Player, Channel, Meter, Transport as t } from "tone";
import Controls from "./Controls";
import MasterVol from "./MasterVol";
import ChannelStrip from "./ChannelStrip";
import Loader from "./Loader";

function Mixer({ song, isLoaded, handleSetIsLoaded }) {
  const requestRef = useRef();
  const channels = useRef([]);
  const players = useRef([]);
  const meters = useRef([]);
  const [meterVals, setMeterVals] = useState([]);
  const [state, setState] = useState("stopped");
  const handleSetState = (value) => setState(value);
  const tracks = song.tracks;

  // make sure song stops at end
  if (t.seconds > song.end) {
    t.position = song.end;
    t.stop();
    setState("stopped");
  }

  useEffect(() => {
    // create audio nodes
    for (let i = 0; i < tracks.length; i++) {
      meters.current.push(new Meter());
      players.current.push(new Player(tracks[i].path));
      channels.current.push(new Channel().toDestination());
    }

    // connect everything
    players.current.forEach((player, i) =>
      player.chain(meters.current[i], channels.current[i]).sync().start()
    );
  }, [tracks]);

  useEffect(() => {
    loaded().then(() => handleSetIsLoaded(true));
  }, [handleSetIsLoaded]);

  // loop recursively to amimateMeters
  const animateMeter = useCallback(() => {
    meters.current.forEach((meter, i) => {
      meterVals[i] = meter.getValue() + 85;
      setMeterVals(() => [...meterVals]);
    });
    requestRef.current = requestAnimationFrame(animateMeter);
  }, [meterVals]);

  // triggers animateMeter
  useEffect(() => {
    requestAnimationFrame(animateMeter);
    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // wait for the buffers to load
  return isLoaded === false ? (
    <div className="loader-wrap">
      <div>
        <span>
          Loading: {song.artist} - {song.name}{" "}
        </span>
        <Loader />
      </div>
    </div>
  ) : (
    <div className="console">
      <div className="mixer">
        {tracks.map((track, i) => {
          return (
            <ChannelStrip
              key={track.path}
              meterVal={meterVals[i]}
              channel={channels.current[i]}
              track={track}
              state={state}
            />
          );
        })}
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
