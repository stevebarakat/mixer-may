import { useRef, useEffect, useState, useCallback } from "react";
import { Destination, Analyser } from "tone";
import { GainToAudio } from "tone";
import VuMeter from "./VuMeter";

function MultiMeter({ state }) {
  const [masterMeterVal, setMasterMeterVal] = useState([]);
  const analyser = useRef();
  const requestRef = useRef();
  const gainToAudio = useRef();

  // console.log("masterMeterVal", masterMeterVal);

  useEffect(() => {
    gainToAudio.current = new GainToAudio();
    analyser.current = new Analyser("fft", 16);
    Destination.connect(analyser.current);
    analyser.current.connect(gainToAudio.current);
  }, []);

  const animateMeter = useCallback(() => {
    setMasterMeterVal(analyser.current.getValue());
    requestRef.current = requestAnimationFrame(animateMeter);
  }, [analyser]);

  useEffect(() => {
    if (state !== "started") return;
    requestAnimationFrame(animateMeter);
    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  let ubu = [];
  masterMeterVal.map((val) => {
    return ubu.push(Math.abs(val));
  });
  console.log(ubu);
  const ebu = ubu.map((val) => (
    <VuMeter meterValue={val} height={240} width={20.5} />
  ));

  return <div style={{ display: "flex", gap: "1px" }}>{ebu}</div>;
}

export default MultiMeter;
