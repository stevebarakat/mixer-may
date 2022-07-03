import { useState, useEffect, useRef, useCallback } from "react";
import VuMeter from "./VuMeter";
import { dBToPercent } from "../../utils/scale";
import useMeter from "../../hooks/useMeter";

function Bus1({
  state,
  busOneChannel,
  busChoices,
  handleSetBusChoices,
  busOneActive,
}) {
  const [masterVol, setMasterVol] = useState(0);
  const busOneActiveBool = busOneActive.some((bus) => bus === true);

  function changeMasterVolume(e) {
    if (!busOneActiveBool) return;
    const value = parseInt(e.target.value, 10);
    const v = Math.log(value + 101) / Math.log(113);
    const sv = dBToPercent(v);
    setMasterVol(Math.round(sv));
    busOneChannel.set({ volume: sv });
  }

  const masterMeterVal = useMeter([busOneChannel]);

  const arr = new Array(2).fill(null);
  const options = arr.map((_, i) => {
    return (
      <div key={i} style={{ display: "flex", flexDirection: "column" }}>
        <select
          onChange={(e) => {
            busChoices[i] = e.target.value;
            handleSetBusChoices([...busChoices]);
          }}
          className="effect-select"
          disabled={!busOneActiveBool}
        >
          <option value={`bs${i + 1}-fx${i + 1}`}>{`FX${i + 1}`}</option>
          <option value="reverb">Reverb</option>
          <option value="delay">Delay</option>
          <option value="chorus">Chorus</option>
          <option value="chebyshev">Chebyshev</option>
          <option value="pitch-shift">PitchShift</option>
          <option value="compressor">Compressor</option>
        </select>
      </div>
    );
  });

  return (
    <div>
      {options}
      <div
        className="fader-wrap"
        style={{
          padding: "12px 0 0 0",
          margin: "0 0 0 16px",
        }}
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
            defaultValue={-32}
            step="0.1"
            onChange={changeMasterVolume}
          />
        </div>
        <div className="track-labels">
          <span className="track-name">Bus 1</span>
        </div>
      </div>
    </div>
  );
}

export default Bus1;
