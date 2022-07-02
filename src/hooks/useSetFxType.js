import { useState, useEffect } from "react";
import {
  Reverb,
  Chorus,
  Compressor,
  PitchShift,
  Chebyshev,
  FeedbackDelay,
} from "tone";

export default function useSetFxType(choices) {
  const [busChoices] = choices;

  const [busOneFxOneType, setBusOneFxOneType] = useState(null);

  const [busOneFxTwoType, setBusOneFxTwoType] = useState(null);

  const [busTwoFxOneType, setBusTwoFxOneType] = useState(null);

  const [busTwoFxTwoType, setBusTwoFxTwoType] = useState(null);

  useEffect(() => {
    choices.forEach((choice, index) => {
      const i = index + 1;
      switch (choice) {
        case "bs1-fx1":
        case "bs1-fx2":
          break;
        case "reverb":
          i === 1 && setBusOneFxOneType(new Reverb({ wet: 1 }).toDestination());
          i === 2 && setBusOneFxTwoType(new Reverb({ wet: 1 }).toDestination());
          i === 3 && setBusTwoFxOneType(new Reverb({ wet: 1 }).toDestination());
          i === 4 && setBusTwoFxTwoType(new Reverb({ wet: 1 }).toDestination());
          break;
        case "delay":
          i === 1 &&
            setBusOneFxOneType(
              new FeedbackDelay({
                wet: 1,
                delayTime: 2.5,
                feedback: 0.5,
              }).toDestination()
            );
          i === 2 &&
            setBusOneFxTwoType(
              new FeedbackDelay({
                wet: 1,
                delayTime: 0.5,
                feedback: 0.5,
              }).toDestination()
            );
          i === 3 &&
            setBusTwoFxOneType(
              new FeedbackDelay({
                wet: 1,
              }).toDestination()
            );
          i === 4 &&
            setBusTwoFxTwoType(
              new FeedbackDelay({
                wet: 1,
              }).toDestination()
            );
          break;
        case "chorus":
          i === 1 &&
            setBusOneFxOneType(
              new Chorus({
                wet: 1,
              }).toDestination()
            );
          i === 2 &&
            setBusOneFxTwoType(
              new Chorus({
                wet: 1,
              }).toDestination()
            );
          i === 3 &&
            setBusTwoFxOneType(
              new Chorus({
                wet: 1,
              }).toDestination()
            );
          i === 4 &&
            setBusTwoFxTwoType(
              new Chorus({
                wet: 1,
              }).toDestination()
            );
          break;
        case "chebyshev":
          i === 1 &&
            setBusOneFxOneType(
              new Chebyshev({
                wet: 1,
              }).toDestination()
            );
          i === 2 &&
            setBusOneFxTwoType(
              new Chebyshev({
                wet: 1,
              }).toDestination()
            );
          i === 3 &&
            setBusTwoFxOneType(
              new Chebyshev({
                wet: 1,
              }).toDestination()
            );
          i === 4 &&
            setBusTwoFxTwoType(
              new Chebyshev({
                wet: 1,
              }).toDestination()
            );
          break;
        case "pitch-shift":
          i === 1 &&
            setBusOneFxOneType(
              new PitchShift({
                wet: 1,
              }).toDestination()
            );
          i === 2 &&
            setBusOneFxTwoType(
              new PitchShift({
                wet: 1,
              }).toDestination()
            );
          i === 3 &&
            setBusTwoFxOneType(
              new PitchShift({
                wet: 1,
              }).toDestination()
            );
          i === 4 &&
            setBusTwoFxTwoType(
              new PitchShift({
                wet: 1,
              }).toDestination()
            );
          break;
        case "compressor":
          i === 1 &&
            setBusOneFxOneType(
              new Compressor({
                wet: 1,
              }).toDestination()
            );
          i === 2 &&
            setBusOneFxTwoType(
              new Compressor({
                wet: 1,
              }).toDestination()
            );
          i === 3 &&
            setBusTwoFxOneType(
              new Compressor({
                wet: 1,
              }).toDestination()
            );
          i === 4 &&
            setBusTwoFxTwoType(
              new Compressor({
                wet: 1,
              }).toDestination()
            );
          break;
        default:
          break;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busChoices]);
  return [busOneFxOneType, busOneFxTwoType, busTwoFxOneType, busTwoFxTwoType];
}
