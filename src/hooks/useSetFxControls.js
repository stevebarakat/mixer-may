import { useState, useEffect } from "react";
import Delay from "../components/FX/Delay";
import Reverber from "../components/FX/Reverb";
import Choruser from "../components/FX/Chorus";
import PitchShifter from "../components/FX/PitchShift";
import Compress from "../components/FX/Compressor";
import Chebyshever from "../components/FX/Chebyshev";

export default function useSetFxControls(
  choices,
  busOneFxOneType,
  busOneFxTwoType,
  busTwoFxOneType,
  busTwoFxTwoType
) {
  const [busOneFxOneControls, setBusOneFxOneControls] = useState(null);
  const [busOneFxTwoControls, setBusOneFxTwoControls] = useState(null);
  const [busTwoFxOneControls, setBusTwoFxOneControls] = useState(null);
  const [busTwoFxTwoControls, setBusTwoFxTwoControls] = useState(null);

  useEffect(() => {
    choices.forEach((choice, index) => {
      const i = index + 1;
      switch (choice) {
        case "bs1-fx1":
          setBusOneFxOneControls(null);
          break;
        case "bs1-fx2":
          setBusOneFxTwoControls(null);
          break;
        case "bs2-fx1":
          setBusTwoFxOneControls(null);
          break;
        case "bs2-fx2":
          setBusTwoFxTwoControls(null);
          break;
        case "delay":
          i === 1 &&
            setBusOneFxOneControls(<Delay controls={busOneFxOneType} />);
          i === 2 &&
            setBusOneFxTwoControls(<Delay controls={busOneFxTwoType} />);
          i === 3 &&
            setBusTwoFxOneControls(<Delay controls={busTwoFxOneType} />);
          i === 4 &&
            setBusTwoFxTwoControls(<Delay controls={busTwoFxTwoType} />);
          break;
        case "reverb":
          i === 1 &&
            setBusOneFxOneControls(<Reverber controls={busOneFxOneType} />);
          i === 2 &&
            setBusOneFxTwoControls(<Reverber controls={busOneFxTwoType} />);
          i === 3 &&
            setBusTwoFxOneControls(<Reverber controls={busTwoFxOneType} />);
          i === 4 &&
            setBusTwoFxTwoControls(<Reverber controls={busTwoFxTwoType} />);
          break;
        case "chebyshev":
          i === 1 &&
            setBusOneFxOneControls(<Chebyshever controls={busOneFxOneType} />);
          i === 2 &&
            setBusOneFxTwoControls(<Chebyshever controls={busOneFxTwoType} />);
          i === 3 &&
            setBusTwoFxOneControls(<Chebyshever controls={busTwoFxOneType} />);
          i === 4 &&
            setBusTwoFxTwoControls(<Chebyshever controls={busTwoFxTwoType} />);
          break;
        case "pitch-shift":
          i === 1 &&
            setBusOneFxOneControls(<PitchShifter controls={busOneFxOneType} />);
          i === 2 &&
            setBusOneFxTwoControls(<PitchShifter controls={busOneFxTwoType} />);
          i === 3 &&
            setBusTwoFxOneControls(<PitchShifter controls={busTwoFxOneType} />);
          i === 4 &&
            setBusTwoFxTwoControls(<PitchShifter controls={busTwoFxTwoType} />);
          break;
        case "chorus":
          i === 1 &&
            setBusOneFxOneControls(<Choruser controls={busOneFxOneType} />);
          i === 2 &&
            setBusOneFxTwoControls(<Choruser controls={busOneFxTwoType} />);
          i === 3 &&
            setBusTwoFxOneControls(<Choruser controls={busTwoFxOneType} />);
          i === 4 &&
            setBusTwoFxTwoControls(<Choruser controls={busTwoFxTwoType} />);
          break;
        case "compressor":
          i === 1 &&
            setBusOneFxOneControls(<Compress controls={busOneFxOneType} />);
          i === 2 &&
            setBusOneFxTwoControls(<Compress controls={busOneFxTwoType} />);
          i === 3 &&
            setBusTwoFxOneControls(<Compress controls={busTwoFxOneType} />);
          i === 4 &&
            setBusTwoFxTwoControls(<Compress controls={busTwoFxTwoType} />);
          break;
        default:
          break;
      }
    });
  }, [busOneFxOneType, busOneFxTwoType, busTwoFxOneType, busTwoFxTwoType]);

  return [
    busOneFxOneControls,
    busOneFxTwoControls,
    busTwoFxOneControls,
    busTwoFxTwoControls,
  ];
}
