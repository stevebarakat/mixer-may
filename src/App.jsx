import { useState, useEffect } from "react";
import Mixer from "./components/Mixer";
import Layout from "./components/Layout/Layout";
import SongSelect from "./components/SongSelect";
import { ninteenOne } from "./songs/1901";
import "./components/styles.css";

function App() {
  const [song, setSong] = useState(
    () => JSON.parse(localStorage.getItem("song")) ?? ninteenOne
  );
  const handleSetSong = (value) => setSong(value);

  useEffect(() => {
    localStorage.setItem("song", JSON.stringify(song));
    try {
      JSON.parse(localStorage.getItem("song"));
    } catch {
      console.error("The song could not be parsed into JSON.");
    }
  }, [song]);

  return (
    <Layout song={song}>
      <Mixer song={song} />
      <SongSelect handleSetSong={handleSetSong} />
    </Layout>
  );
}

export default App;
