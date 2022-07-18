import { useState } from "react";
import VuMeter from "./VuMeter";
import { dBToPercent } from "../../utils/scale";
import useMeter from "../../hooks/useMeter";

function Bus({
  index,
  busChannel,
  fxChoices,
  handleSetFxChoices,
  activeBusses,
}) {
  const [masterVol, setMasterVol] = useState(0);
  const busOneActiveBool = activeBusses.some((bus) => bus === true);

  function changeMasterVolume(e) {
    if (!busOneActiveBool) return;
    const value = parseInt(e.target.value, 10);
    const v = Math.log(value + 101) / Math.log(113);
    const sv = dBToPercent(v);
    setMasterVol(Math.round(sv));
    busChannel.set({ volume: sv });
  }

  // const masterMeterVal = useMeter([busChannel]);

  const arr = new Array(2).fill(null);
  const onChange = (e, j, i) => {
    handleSetFxChoices((currentFxChoices) => {
      const temp = currentFxChoices.map((each) => [...each]);
      temp[j][i] = e.target.value;
      return temp;
    });
  };

  const options = (j) =>
    arr.map((_, i) => {
      return (
        <div key={i} style={{ display: "flex", flexDirection: "column" }}>
          <select
            onChange={(e) => onChange(e, j, i)}
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
      {options(index)}
      <div
        className="fader-wrap"
        style={{
          padding: "12px 0 0 0",
          margin: "0 0 0 16px",
        }}
      >
        <div className="window">
          <input
            disabled
            type="text"
            className="level-val"
            value={masterVol + " db"}
          />
        </div>
        <div className="levels-wrap">
          <VuMeter meterValue={0} height={450} width={12.5} />
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
          <span className="track-name">Bus {index + 1}</span>
        </div>
      </div>
    </div>
  );
}

export default Bus;
