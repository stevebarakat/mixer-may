import Restart from "./Restart";
import Rewind from "./Rewind";
import FastFwd from "./FastFwd";
import Play from "./Play";
import Clock from "./Clock";

function Controls({ song }) {
  return (
    <>
      <div className="buttons-wrap">
        <Restart song={song} />
        <Rewind song={song} />
        <Play song={song} />
        <FastFwd song={song} />
      </div>
      <Clock song={song} />
    </>
  );
}

export default Controls;
