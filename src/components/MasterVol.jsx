import { useState, useEffect, useRef } from "react";
import { Destination, Meter } from "tone";
import VuMeter from "./VuMeter";
import scale from "../utils/scale";

const masterMeter = new Meter();

function MasterVol() {
  const requestRef = useRef();
  const [masterMeterVal, setMasterMeterVal] = useState(0);
  const [masterVol, setMasterVol] = useState(0 + " db");
  Destination.connect(masterMeter);

  function changeMasterVolume(e) {
    const value = parseInt(e.target.value, 10);
    const v = Math.log(value + 101) / Math.log(113);
    const sv = scale(v, 0, 1, -100, 12);
    setMasterVol(Math.round(sv) + " db");
    Destination.set({ volume: sv });
  }

  const animateMeter = () => {
    setMasterMeterVal(masterMeter.getValue() + 85);
    requestRef.current = requestAnimationFrame(animateMeter);
  };

  useEffect(() => {
    requestAnimationFrame(animateMeter);
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fader-wrap"
      style={{ paddingBottom: 0, margin: "5px 0 0 16px", borderRadius: "4px" }}
    >
      <div className="window js-window">
        <input
          disabled
          type="text"
          className="level-val"
          value={masterVol + " db"}
        />
      </div>
      <div className="levels-wrap">
        <VuMeter meterValue={masterMeterVal} height={450} width={12.5} />
      </div>
      <div className="master-vol-wrap">
        <input
          className="master-volume"
          type="range"
          min={-100}
          max={12}
          defaultValue={-20}
          step="1"
          onChange={changeMasterVolume}
        />
      </div>
      <div className="track-labels">
        <span className="track-name">Master</span>
      </div>
    </div>
  );
}

export default MasterVol;
