import { useEffect, useCallback, useRef, useState } from "react";
import { Meter } from "tone";

export default function useMeters(channels) {
  const [meterVals, setMeterVals] = useState([]);
  const meters = useRef([]);

  console.log(meters[1] !== undefined && meters[1].getValue());

  const requestRef = useRef();

  useEffect(() => {
    channels.forEach((channel, i) => {
      meters.current[i] = new Meter();
      channel.connect(meters.current[i]);
    });
  }, [channels]);

  // loop recursively to amimateMeters
  const animateMeter = useCallback(() => {
    meters.current.forEach((meter, i) => {
      meterVals[i] = meter.getValue() + 85;
      setMeterVals(() => [...meterVals]);
    });
    requestRef.current = requestAnimationFrame(animateMeter);
  }, [meterVals]);

  // triggers animateMeter

  useEffect(() => {
    requestAnimationFrame(animateMeter);
    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return meterVals;
}
