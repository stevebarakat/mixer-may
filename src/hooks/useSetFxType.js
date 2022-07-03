import { useState, useEffect } from "react";
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

export default function useSetFxType(choices, busOneChannel) {
  const [fxTypes] = useState([]);
  const [fxControls, setFxControls] = useState([]);

  choices.forEach((choice, i) => {
    fxTypes[i] && fxTypes[i].disconnect();
    switch (choice) {
      case `bs${i + 1}-fx${i + 1}`:
        fxControls[i] = null;
        break;
      case "reverb":
        fxTypes[i] = new Reverb({ decay: 2, delayTime: 2 }).toDestination();
        fxControls[i] = <Reverber controls={fxTypes[i]} />;
        break;
      case "delay":
        fxTypes[i] = new FeedbackDelay({
          delayTime: 2,
          feedback: 1,
          wet: 1,
        }).toDestination();
        fxControls[i] = <Delay controls={fxTypes[i]} />;
        break;
      case "chorus":
        fxTypes[i] = new Chorus().toDestination();
        fxControls[i] = <Choruser controls={fxTypes[i]} />;
        break;
      case "chebyshev":
        fxTypes[i] = new Chebyshev({ order: 78 }).toDestination();
        fxControls[i] = <Chebyshever controls={fxTypes[i]} />;
        break;
      case "pitch-shift":
        fxTypes[i] = new PitchShift({
          pitch: 25,
          depth: 1,
          delayTime: 1,
        }).toDestination();
        fxControls[i] = <PitchShifter controls={fxTypes[i]} />;
        break;
      case "compressor":
        fxTypes[i] = new Compressor().toDestination();
        fxControls[i] = <Compress controls={fxTypes[i]} />;
        break;
      default:
        break;
    }
  });
  useEffect(() => {
    choices.forEach((choice, i) => {
      if (choice === `bs${i + 1}-fx${i + 1}`) fxTypes[i].dispose();
      if (fxTypes[i] === null || busOneChannel.current === null) return;
      busOneChannel.current.connect(fxTypes[i]);
      return () => fxTypes[i].dispose();
    });
  }, [fxTypes, choices]);
  return [fxControls];
}
