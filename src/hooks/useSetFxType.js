import { useState } from "react";
import {
  Reverb,
  Chorus,
  Compressor,
  PitchShift,
  Chebyshev,
  FeedbackDelay,
} from "tone";

export default function useSetFxType(choices) {
  const [fxTypes] = useState([]);

  choices.forEach((choice, i) => {
    switch (choice) {
      case "bs1-fx1":
      case "bs1-fx2":
        break;
      case "reverb":
        fxTypes[i] && fxTypes[i].dispose();
        fxTypes[i] = new Reverb({ decay: 2, delayTime: 2 }).toDestination();
        break;
      case "delay":
        fxTypes[i] && fxTypes[i].dispose();
        fxTypes[i] = new FeedbackDelay({
          delayTime: 2,
          feedback: 1,
          wet: 1,
        }).toDestination();
        break;
      case "chorus":
        fxTypes[i] && fxTypes[i].dispose();
        fxTypes[i] = new Chorus().toDestination();
        break;
      case "chebyshev":
        fxTypes[i] && fxTypes[i].dispose();
        fxTypes[i] = new Chebyshev({ order: 78 }).toDestination();
        break;
      case "pitch-shift":
        fxTypes[i] && fxTypes[i].dispose();
        fxTypes[i] = new PitchShift({
          pitch: 25,
          depth: 1,
          delayTime: 1,
        }).toDestination();
        break;
      case "compressor":
        fxTypes[i] && fxTypes[i].dispose();
        fxTypes[i] = new Compressor().toDestination();
        break;
      default:
        break;
    }
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return [fxTypes];
}
