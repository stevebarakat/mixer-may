import { useState, useEffect } from "react";
import Mixer from "./components/Mixer";
import Dropdown from "./components/Dropdown";
import { ninteenOne } from "./songs/1901";
import { justDance } from "./songs/justDance";
import { aDayInTheLife } from "./songs/aDayInTheLife";
import { blackHoleSun } from "./songs/blackHoleSun";
import { whenIComeAround } from "./songs/whenIComeAround";
import { creep } from "./songs/creep";
import { dontLookBack } from "./songs/dontLookBack";
import { lonleyHeart } from "./songs/lonleyHeart";
import { blueMonday } from "./songs/blueMonday";
import { borderline } from "./songs/borderline";
import { roxanne } from "./songs/roxanne";
import { rhiannon } from "./songs/rhiannon";
import { numb } from "./songs/numb";
import { underPressure } from "./songs/underPressure";
import { lithium } from "./songs/lithium";
import { beatIt } from "./songs/beatIt";
import options from "./songs/options";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleSetIsLoaded = (value) => setIsLoaded(value);
  const [song, setSong] = useState(
    () => JSON.parse(localStorage.getItem("song")) ?? ninteenOne
  );

  useEffect(() => {
    localStorage.setItem("song", JSON.stringify(song));

    try {
      return JSON.parse(localStorage.getItem("song"));
    } catch {
      console.error("The song could not be parsed into JSON.");
      return {};
    }
  }, [song]);

  function handleChange(value) {
    setIsLoaded(false);
    switch (value) {
      case "1901":
        setSong(ninteenOne);
        break;
      case "just-dance":
        setSong(justDance);
        break;
      case "a-day-in-the-life":
        setSong(aDayInTheLife);
        break;
      case "black-hole-sun":
        setSong(blackHoleSun);
        break;
      case "beat-it":
        setSong(beatIt);
        break;
      case "dont-look-back":
        setSong(dontLookBack);
        break;
      case "when-i-come-around":
        setSong(whenIComeAround);
        break;
      case "lonley-heart":
        setSong(lonleyHeart);
        break;
      case "blue-monday":
        setSong(blueMonday);
        break;
      case "creep":
        setSong(creep);
        break;
      case "borderline":
        setSong(borderline);
        break;
      case "numb":
        setSong(numb);
        break;
      case "under-pressure":
        setSong(underPressure);
        break;
      case "roxanne":
        setSong(roxanne);
        break;
      case "rhiannon":
        setSong(rhiannon);
        break;
      case "lithium":
        setSong(lithium);
        break;
      default:
        break;
    }
    window.location.reload();
  }

  return (
    <>
      <Mixer
        song={song}
        isLoaded={isLoaded}
        handleSetIsLoaded={handleSetIsLoaded}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label className="hidden" htmlFor="song-select">
          Choose a song:
        </label>
        <Dropdown
          options={options}
          id="id"
          label="name"
          prompt="Search for a song..."
          value={song}
          onChange={(val) => handleChange(val.slug)}
        />
      </div>
    </>
  );
}

export default App;
