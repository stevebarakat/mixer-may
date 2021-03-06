import { Fragment, useState } from "react";
import { Knob } from "react-rotary-knob";
import skin from "../../utils/skin";
import VuMeter from "./VuMeter";
import { scale } from "../../utils/scale";
import useMeter from "../../hooks/useMeter";

function ChannelStrip({
  index,
  track,
  tracks,
  channel,
  eq,
  toggleBus,
  busChannels,
}) {
  const [isMuted, setIsMuted] = useState(track.mute);
  const [volume, setVolume] = useState(0);
  const [highEqLevel, setHighEqLevel] = useState(track.highEqLevel);
  const [midEqLevel, setMidEqLevel] = useState(track.midEqLevel);
  const [lowEqLevel, setLowEqLevel] = useState(track.lowEqLevel);
  const meterVal = useMeter([channel]);

  // THIS IS WHERE THE LOGARITHMIC SCALE IS SET
  function changeVolume(e) {
    if (isMuted) return;
    const value = parseFloat(e.target.value, 10);
    const vol = Math.log(value + 101) / Math.log(113);
    const scaledVol = scale(vol, 0, 1, -100, 12);

    setVolume(value);
    channel.set({ volume: scaledVol });
  }

  // THIS IS WHERE PAN IS SET
  function changePan(e) {
    const pan = e.target.value;
    channel.set({ pan });
  }

  // THIS IS WHERE SOLO IS SET
  function changeSolo(e) {
    const solo = e.target.checked;
    channel.set({ solo });
  }

  // THIS IS WHERE MUTE IS SET
  function changeMute(e) {
    const mute = e.target.checked;
    setIsMuted(mute);
    channel.set({ mute });
  }

  // THIS IS WHERE HIGH EQ IS SET
  function changeHighEqLevel(val) {
    eq.high.value = val;

    setHighEqLevel(val);
  }

  // THIS IS WHERE MID EQ IS SET
  function changeMidEqLevel(val) {
    eq.mid.value = val;

    setMidEqLevel(val);
  }

  // THIS IS WHERE LOW EQ IS SET
  function changeLowEqLevel(val) {
    eq.low.value = val;

    setLowEqLevel(val);
  }

  return (
    <div className="channel">
      <div className="fader-wrap">
        <div className="pan-labels">EQ</div>
        <div id="hi">
          <input type="hidden" name="actionName" value="changeHighEqLevel" />
          <Knob
            className="knob"
            min={-8}
            max={8}
            preciseMode={true}
            unlockDistance={35}
            rotateDegrees={180}
            clampMin={40}
            clampMax={320}
            defaultValue={track.highEqLevel}
            value={highEqLevel}
            onChange={changeHighEqLevel}
            step={0.01}
            skin={skin}
            track={track}
          />
        </div>
        <div id="mid">
          <input type="hidden" name="actionName" value="changeMidEqLevel" />
          <Knob
            onChange={changeMidEqLevel}
            className="knob"
            min={-8}
            max={8}
            preciseMode={true}
            unlockDistance={35}
            rotateDegrees={180}
            clampMin={40}
            clampMax={320}
            defaultValue={track.midEqLevel}
            value={midEqLevel}
            step={0.01}
            skin={skin}
            track={track}
          />
        </div>
        <div id="low">
          <input type="hidden" name="actionName" value="changeLowEqLevel" />
          <Knob
            onChange={changeLowEqLevel}
            className="knob"
            min={-8}
            max={8}
            preciseMode={true}
            unlockDistance={35}
            rotateDegrees={180}
            clampMin={40}
            clampMax={320}
            defaultValue={track.lowEqLevel}
            value={lowEqLevel}
            step={0.01}
            skin={skin}
            track={track}
          />
        </div>
      </div>
      <div className="solo-mute">
        <input
          id={`solo${track.path}`}
          type="checkbox"
          defaultChecked={track.solo}
          onChange={changeSolo}
        />
        <label className="label" htmlFor={`solo${track.path}`}>
          S
        </label>
        <input
          id={`mute${track.path}`}
          type="checkbox"
          defaultChecked={track.mute}
          onChange={changeMute}
        />
        <label className="label" htmlFor={`mute${track.path}`}>
          M
        </label>
      </div>
      <div className="solo-mute">
        {busChannels.map((_, i) => (
          <Fragment key={i}>
            <input
              key={i}
              id={`bus${i + track.path}`}
              name={index}
              type="checkbox"
              onChange={toggleBus}
            />
            <label className="label" htmlFor={`bus${i + track.path}`}>
              {i + 1}
            </label>
          </Fragment>
        ))}
      </div>

      <div className="fader-wrap">
        <div>
          <input
            id={track.id}
            className="pan"
            type="range"
            defaultValue={track.pan}
            min={-1}
            max={1}
            step={0.001}
            onChange={changePan}
          />
          <div className="pan-labels">
            <span>L</span>
            <span>R</span>
          </div>
        </div>
        <div className="window js-window">
          <input
            disabled
            type="text"
            className="level-val"
            value={Math.round(volume) + " db"}
          />
        </div>
        <div className="levels-wrap">
          <VuMeter meterValue={meterVal} height={300} width={10} />
        </div>
        <div className="vol-wrap">
          <input
            id={track.id}
            className="volume"
            type="range"
            min={-100}
            max={12}
            step={0.01}
            defaultValue={volume}
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
