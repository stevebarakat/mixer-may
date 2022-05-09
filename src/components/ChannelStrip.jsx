import { useState } from "react";
import VuMeter from "./VuMeter";
import SoloMute from "./SoloMute";
import scale from "../utils/scale";
import "./channel-strip.css";

function ChannelStrip({ track, channel, eq, meterVal, state }) {
  const [volume, setVolume] = useState(0);
  const [pan, setPan] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const handleSetIsMuted = (value) => setIsMuted(value);
  const preFader = meterVal;
  const postFader = meterVal + volume;
  const [isPostFader, setIsPostFader] = useState(true);

  // THIS IS WHERE THE LOGARITHMIC SCALE IS SET
  function changeVolume(e) {
    if (isMuted) return;
    const value = parseInt(e.target.value, 10);
    const vol = Math.log(value + 101) / Math.log(113);
    const scaledVol = scale(vol, 0, 1, -100, 12);
    channel.set({ volume: scaledVol });
    setVolume(Math.round(scaledVol));
  }
  // console.log("meterVal", meterVal);
  return (
    <div className="channel">
      <SoloMute
        channel={channel}
        track={track}
        handleSetIsMuted={handleSetIsMuted}
      />
      <div className="pfl">
        <input
          id={`postFader${track.path}`}
          type="checkbox"
          onChange={(e) => {
            setIsPostFader(!e.target.checked);
          }}
        />
        <label className="label" htmlFor={`postFader${track.path}`}>
          {isPostFader ? "POST" : "PRE"}
        </label>
      </div>

      <div className="fader-wrap">
        <div>
          <input
            className="pan"
            type="range"
            min="0"
            max="12"
            defaultValue="0"
            step="0.01"
            onChange={(e) => {
              // eq.lowFrequency._param.value = e.target.value;
              eq.mid._param.value = e.target.value;
              console.log("eq.defaultValue");
            }}
          />
          <div className="pan-labels">
            <span>E</span>
            <span>Q</span>
          </div>
        </div>
        <div>
          <input
            className="pan"
            type="range"
            defaultValue={track.pan}
            min="-1"
            max="1"
            step="0.01"
            onChange={(e) => {
              channel.set({ pan: e.target.value });
              setPan(e.target.value);
            }}
          />
          <div className="pan-labels">
            <span style={{ color: `hsl(0, ${pan * -100}%,  ${pan * -50}%)` }}>
              L
            </span>
            <span style={{ color: `hsl(0, ${pan * 100}%, ${pan * 50}%)` }}>
              R
            </span>
          </div>
        </div>
        <div className="window js-window">
          <input
            disabled
            type="text"
            className="level-val"
            value={volume + " db"}
          />
        </div>
        <div className="levels-wrap">
          <VuMeter
            meterValue={isPostFader ? postFader : preFader}
            height={300}
            width={10}
          />
        </div>
        <div className="vol-wrap">
          <input
            className="volume"
            type="range"
            min={-100}
            max={12}
            defaultValue={track.volume || -20}
            step={0.01}
            onChange={changeVolume}
          />
        </div>
        <div className="track-labels">
          <span className="track-name">{track.name}</span>
        </div>
      </div>
    </div>
  );
}

export default ChannelStrip;
