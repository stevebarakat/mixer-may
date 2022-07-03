import { useState } from "react";
import {
  Reverb,
  Chorus,
  Compressor,
  PitchShift,
  Chebyshev,
  FeedbackDelay,
} from "tone";
import Delay from "../components/FX/Delay";
import Reverber from "../components/FX/Reverb";
import Choruser from "../components/FX/Chorus";
import PitchShifter from "../components/FX/PitchShift";
import Compress from "../components/FX/Compressor";
import Chebyshever from "../components/FX/Chebyshev";

export default function useSetFxType(choices) {
  const [fxTypes] = useState([]);
  const [fxControls, setFxControls] = useState([]);

  choices.forEach((choice, i) => {
    fxTypes[i] && fxTypes[i].disconnect();
    switch (choice) {
      case `bs${i + 1}-fx${i + 1}`:
        fxControls[i] = null;
        break;
      case "reverb":
        fxControls[i] = <Reverber controls={fxTypes[i]} />;
        fxTypes[i] = new Reverb({ decay: 2, delayTime: 2 }).toDestination();
        break;
      case "delay":
        fxControls[i] = <Delay controls={fxTypes[i]} />;
        fxTypes[i] = new FeedbackDelay({
          delayTime: 2,
          feedback: 1,
          wet: 1,
        }).toDestination();
        break;
      case "chorus":
        fxControls[i] = <Choruser controls={fxTypes[i]} />;
        fxTypes[i] = new Chorus().toDestination();
        break;
      case "chebyshev":
        fxControls[i] = <Chebyshever controls={fxTypes[i]} />;
        fxTypes[i] = new Chebyshev({ order: 78 }).toDestination();
        break;
      case "pitch-shift":
        fxControls[i] = <PitchShifter controls={fxTypes[i]} />;
        fxTypes[i] = new PitchShift({
          pitch: 25,
          depth: 1,
          delayTime: 1,
        }).toDestination();
        break;
      case "compressor":
        fxControls[i] = <Compress controls={fxTypes[i]} />;
        fxTypes[i] = new Compressor().toDestination();
        break;
      default:
        break;
    }
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return [fxTypes, fxControls];
}
