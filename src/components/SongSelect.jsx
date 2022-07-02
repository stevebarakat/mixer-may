import React from "react";
import { numb } from "../songs/numb";
import { beatIt } from "../songs/beatIt";
import { teenageRiot } from "../songs/teenageRiot";
import { babyOneMoreTime } from "../songs/babyOneMoreTime";

function SongSelect({ handleSetSong }) {
  function handleChange(e) {
    switch (e.target.value) {
      case "beat-it":
        handleSetSong(beatIt);
        break;

      case "teenage-riot":
        handleSetSong(teenageRiot);
        break;

      case "numb":
        handleSetSong(numb);
        break;

      case "baby-one-more-time":
        handleSetSong(babyOneMoreTime);
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
        <option value="baby-one-more-time">
          Britney Spears - Baby One More Time
        </option>
        <option value="teenage-riot">SonicYouth - Teenage Riot</option>
      </select>
    </div>
  );
}

export default SongSelect;
