import React from "react";
import { ninteenOne } from "../songs/1901";
import { justDance } from "../songs/justDance";
import { aDayInTheLife } from "../songs/aDayInTheLife";
import { blackHoleSun } from "../songs/blackHoleSun";
import { whenIComeAround } from "../songs/whenIComeAround";
import { creep } from "../songs/creep";
import { dontLookBack } from "../songs/dontLookBack";
import { lonleyHeart } from "../songs/lonleyHeart";
import { blueMonday } from "../songs/blueMonday";
import { borderline } from "../songs/borderline";
import { roxanne } from "../songs/roxanne";
import { rhiannon } from "../songs/rhiannon";
import { numb } from "../songs/numb";
import { underPressure } from "../songs/underPressure";
import { lithium } from "../songs/lithium";
import { beatIt } from "../songs/beatIt";

function SongSelect({ handleSetSong }) {
  function handleChange(e) {
    switch (e.target.value) {
      case "1901":
        handleSetSong(ninteenOne);
        break;
      case "just-dance":
        handleSetSong(justDance);
        break;
      case "a-day-in-the-life":
        handleSetSong(aDayInTheLife);
        break;
      case "black-hole-sun":
        handleSetSong(blackHoleSun);
        break;
      case "beat-it":
        handleSetSong(beatIt);
        break;
      case "dont-look-back":
        handleSetSong(dontLookBack);
        break;
      case "when-i-come-around":
        handleSetSong(whenIComeAround);
        break;
      case "lonley-heart":
        handleSetSong(lonleyHeart);
        break;
      case "blue-monday":
        handleSetSong(blueMonday);
        break;
      case "creep":
        handleSetSong(creep);
        break;
      case "borderline":
        handleSetSong(borderline);
        break;
      case "numb":
        handleSetSong(numb);
        break;
      case "under-pressure":
        handleSetSong(underPressure);
        break;
      case "roxanne":
        handleSetSong(roxanne);
        break;
      case "rhiannon":
        handleSetSong(rhiannon);
        break;
      case "lithium":
        handleSetSong(lithium);
        break;
      default:
        break;
    }
    window.location.reload();
  }

  return (
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
        <option value="dont-look-back">Oasis - Don't Look Back In Anger</option>
        <option value="lithium">Nirvana - Lithum (alternate take)</option>
        <option value="borderline">Madonna - Borderline</option>
        <option value="a-day-in-the-life">
          The Beatles - A Day In The Life
        </option>
        <option value="just-dance">Lady Gaga - Just Dance</option>
      </select>
    </div>
  );
}

export default SongSelect;
