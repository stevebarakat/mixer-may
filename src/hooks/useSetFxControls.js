import { useState, useEffect } from "react";
import Delay from "../components/FX/Delay";
import Reverber from "../components/FX/Reverb";
import Choruser from "../components/FX/Chorus";
import PitchShifter from "../components/FX/PitchShift";
import Compress from "../components/FX/Compressor";
import Chebyshever from "../components/FX/Chebyshev";

export default function useSetFxControls(choices, fxTypes) {
  const [fxControls, setFxControls] = useState([]);

  useEffect(() => {
    choices.forEach((choice, i) => {
      switch (choice) {
        case `bs${i + 1}-fx${i + 1}`:
          fxControls[i] = null;
          setFxControls([...fxControls]);
          break;
        case "delay":
          fxControls[i] = <Delay controls={fxTypes[i]} />;
          setFxControls([...fxControls]);
          break;
        case "reverb":
          fxControls[i] = <Reverber controls={fxTypes[i]} />;
          setFxControls([...fxControls]);
          break;
        case "chebyshev":
          fxControls[i] = <Chebyshever controls={fxTypes[i]} />;
          setFxControls([...fxControls]);
          break;
        case "pitch-shift":
          fxControls[i] = <PitchShifter controls={fxTypes[i]} />;
          setFxControls([...fxControls]);
          break;
        case "chorus":
          fxControls[i] = <Choruser controls={fxTypes[i]} />;
          setFxControls([...fxControls]);
          break;
        case "compressor":
          fxControls[i] = <Compress controls={fxTypes[i]} />;
          setFxControls([...fxControls]);
          break;
        default:
          break;
      }
    });
  }, [fxTypes, choices]);

  return [fxControls];
}
