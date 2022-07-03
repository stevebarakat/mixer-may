import { useState } from "react";
import { start, Transport as t } from "tone";
import { FaPlay, FaPause } from "react-icons/fa";

function Play({ song }) {
  const [state, setState] = useState("stopped");
  const [ready, setReady] = useState(false);

  function initializeAudioContext() {
    start();
    t.position = song.start;
    t.start();
    setState("started");
    setReady(true);
  }

  function startSong() {
    if (state === "started") {
      t.pause();
      setState("paused");
    } else if (state === "stopped") {
      t.start();
      setState("started");
    } else if (state === "paused") {
      t.start();
      setState("started");
    }
  }

  const playerState = (() => {
    switch (t.state) {
      case "stopped":
        return <FaPlay />;
      case "paused":
        return <FaPlay />;
      case "started":
        return <FaPause />;
      default:
        break;
    }
  })();

  return (
    <div>
      {ready ? (
        <button className="button" onClick={startSong}>
          {playerState}
        </button>
      ) : (
        <button className="button" onClick={initializeAudioContext}>
          <FaPlay />
        </button>
      )}
    </div>
  );
}

export default Play;
