import { useRef, useEffect } from "react";
import "./vu-meter.css";

// Settings
const max = 100;
// const width = 10;
// const height = 300;
const boxCount = 100;
const boxCountRed = 20;
const boxCountYellow = 30;
const boxGapFraction = 0.2;
var curVal = 0;
// Colors
const redOn = "rgba(255,47,30,0.9)";
const redOff = "rgba(64,12,8,0.9)";
const yellowOn = "rgba(255,215,5,0.9)";
const yellowOff = "rgba(64,53,0,0.9)";
const greenOn = "rgba(53,255,30,0.9)";
const greenOff = "rgba(13,64,8,0.9)";

function VuMeter({ meterValue, height, width }) {
  const stage = useRef();
  const drawRef = useRef();

  // Gap between boxes and box height
  const boxHeight = height / (boxCount + (boxCount + 1) * boxGapFraction);
  const boxGapY = boxHeight * boxGapFraction;

  const boxWidth = width - boxGapY * 2;
  const boxGapX = (width - boxWidth) / 2;

  // Get the color of a box given it's ID and the current value
  const getBoxColor = (id, val) => {
    if (id > boxCount - boxCountRed) {
      return id <= Math.ceil((val / max) * boxCount) ? redOn : redOff;
    }
    if (id > boxCount - boxCountRed - boxCountYellow) {
      return id <= Math.ceil((val / max) * boxCount) ? yellowOn : yellowOff;
    }
    return id <= Math.ceil((val / max) * boxCount) ? greenOn : greenOff;
  };

  useEffect(() => {
    const c = stage.current.getContext("2d");

    c.fillStyle = "green";
    c.strokeStyle = "black";

    c.shadowBlur = 5;

    const draw = function () {
      const targetVal = parseInt(stage.current.dataset.volume, 10);

      // Gradual approach
      if (curVal <= targetVal) {
        curVal += (targetVal - curVal) / 5;
      } else {
        curVal -= (curVal - targetVal) / 5;
      }

      // Draw the container
      c.save();
      c.beginPath();
      c.rect(0, 0, width, height);
      c.fillStyle = "rgb(12,22,32)";
      c.fill();
      c.restore();

      // Draw the boxes
      c.save();
      c.translate(boxGapX, boxGapY);
      for (let i = 0; i < boxCount; i++) {
        const id = Math.abs(i - (boxCount - 1)) + 1;

        c.beginPath();
        if (id <= Math.ceil((targetVal / max) * boxCount)) {
          c.shadowBlur = 10;
          c.shadowColor = getBoxColor(id, targetVal);
        }
        c.rect(0, 0, boxWidth, boxHeight);
        c.fillStyle = getBoxColor(id, targetVal);
        c.fill();
        c.translate(0, boxHeight + boxGapY);
      }
      c.restore();

      drawRef.current = requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);

    return () => cancelAnimationFrame(drawRef.current);
  }, []);

  useEffect(() => {
    stage.current.dataset.volume = meterValue;
  }, [meterValue]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <canvas
        className="vu-meter"
        ref={stage}
        width={width}
        height={height}
        data-volume={0}
      />
    </div>
  );
}

export default VuMeter;
