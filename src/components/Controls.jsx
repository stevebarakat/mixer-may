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
        <div className="playing artist">{song.artist}</div>
        <div className="playing song">{song.name}</div>
        <div className="song-info clearfix">
          <div className="song-time start">
            {formatSeconds(Transport.seconds)}
          </div>
          <div className="scrollbox dot">
            <div className="hitbox js-window-hitbox"></div>
            <div className="scale js-window-scale" style={{ width: "20%" }}>
              <div className="slider"></div>
            </div>
          </div>
          <div className="song-time end">{formatSeconds(song.end)}</div>
        </div>
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
