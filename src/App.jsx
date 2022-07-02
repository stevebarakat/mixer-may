import { useState, useEffect } from "react";
import Mixer from "./components/Mixer";
import { ninteenOne } from "./songs/1901";
import { justDance } from "./songs/justDance";
import { babyOneMoreTime } from "./songs/babyOneMoreTime";
import { aDayInTheLife } from "./songs/aDayInTheLife";
import { blackHoleSun } from "./songs/blackHoleSun";
import { whenIComeAround } from "./songs/whenIComeAround";
import { creep } from "./songs/creep";
import { dontLookBack } from "./songs/dontLookBack";
import { lonleyHeart } from "./songs/lonleyHeart";
import { blueMonday } from "./songs/blueMonday";
import { teenageRiot } from "./songs/teenageRiot";
import { borderline } from "./songs/borderline";
import { roxanne } from "./songs/roxanne";
import { rhiannon } from "./songs/rhiannon";
import { numb } from "./songs/numb";
import { underPressure } from "./songs/underPressure";
import { lithium } from "./songs/lithium";
import { beatIt } from "./songs/beatIt";
import "./components/styles.css";

function App() {
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

  function handleChange(e) {
    switch (e.target.value) {
      case "1901":
        setSong(ninteenOne);
        break;
      case "just-dance":
        setSong(justDance);
        break;
      case "teenage-riot":
        setSong(teenageRiot);
        break;
      case "baby-one-more-time":
        setSong(babyOneMoreTime);
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
      <Mixer song={song} />
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

        <select
          className="song-select"
          name="pets"
          id="pet-select"
          onChange={handleChange}
        >
          <option value="">Select A Song...</option>
          <option value="roxanne">The Police - Roxanne</option>
          <option value="creep">Radiohead - Creep</option>
          <option value="ninteenOne">Phoenix - 1901</option>
          <option value="dont-look-back">
            Oasis - Don't Look Back In Anger
          </option>
          <option value="lithium">Nirvana - Lithum (alternate take)</option>
          <option value="borderline">Madonna - Borderline</option>
          <option value="a-day-in-the-life">
            The Beatles - A Day In The Life
          </option>
          <option value="just-dance">Lady Gaga - Just Dance</option>
          <option value="teenage-riot">Sonic Youth - Teenage Riot</option>
          <option value="baby-one-more-time">
            Britney Spears - Baby One More Time
          </option>
        </select>
      </div>
    </>
  );
}

export default App;
