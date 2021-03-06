import { useEffect, useRef, useCallback, useState } from "react";
import { Transport as t } from "tone";
import { formatMilliseconds } from "../../utils/formatTime";

function Clock({ song }) {
  const requestRef = useRef();
  const [clock, setClock] = useState("0:0:0");

  // make sure song stops at end
  if (t.seconds > song.end) {
    t.stop();
    t.position = "0:0:0";
  }
  // make sure song doesn't rewind past start position
  if (t.seconds < 0) {
    t.stop();
    t.position = "0:0:0";
    t.start();
  }

  const animateClock = useCallback(() => {
    requestRef.current = requestAnimationFrame(animateClock);
    setClock(formatMilliseconds(t.seconds));
  }, []);

  // triggers animateClock
  useEffect(() => {
    requestAnimationFrame(animateClock);
    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="clock">
      <div className="ghost">88:88:88</div>
      {clock}
    </div>
  );
}

export default Clock;
