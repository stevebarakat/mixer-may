import { useRef } from "react";
import { Transport } from "tone";
import Restart from "./Restart";
import Rewind from "./Rewind";
import FastFwd from "./FastFwd";
import Play from "./Play";
import { formatSeconds } from "../utils/formatTime";
import { formatMilliseconds } from "../utils/formatTime";

function Controls({ song, state, handleSetState }) {
  Transport.bpm.value = song.bpm;
  const startTime = useRef(Transport.now());
  const currentTime = useRef(Transport.now());

  return (
    <>
      <div className="window js-window">
        <div className="playing artist">Artist: {song.artist}</div>
        <div className="playing song">Song:{song.name}</div>
        <div className="playing song">Year:{song.year}</div>
        <div className="playing song">Studio:{song.studio}</div>
        <div className="playing song">Location:{song.location}</div>
      </div>
      <div className="buttons-wrap">
        <Restart song={song} startTime={startTime} />
        <Rewind startTime={startTime} startPosition={song.start} />
        <Play song={song} state={state} handleSetState={handleSetState} />
        <FastFwd
          startTime={startTime}
          currentTime={currentTime}
          startPosition={song.start}
          endPosition={song.end}
          handleSetState={handleSetState}
        />
      </div>
      <div className="clock">
        <div className="ghost">88:88:88</div>
        {formatMilliseconds(Transport.seconds)}
      </div>
      {/* <div className="window js-window">
        {formatMilliseconds(Transport.seconds)}
      </div> */}
    </>
  );
}

export default Controls;
