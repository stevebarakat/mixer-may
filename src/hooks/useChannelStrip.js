import { useEffect, useRef, useState } from "react";
import {
  loaded,
  EQ3,
  Channel,
  Player,
  Destination,
  Transport as t,
} from "tone";

function useChannelStrip({ tracks }) {
  const channels = useRef([]);
  const players = useRef([]);
  const eqs = useRef([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // create audio nodes

    for (let i = 0; i < tracks.length; i++) {
      eqs.current = [...eqs.current, new EQ3()];
      channels.current = [
        ...channels.current,
        new Channel(tracks[i].volume, tracks[i].pan).connect(Destination),
      ];
      players.current = [...players.current, new Player(tracks[i].path)];
    }

    // connect everything
    players.current.forEach((player, i) =>
      player.chain(eqs.current[i], channels.current[i]).sync().start()
    );

    return () => {
      t.stop();
      players.current.forEach((player, i) => {
        player.disconnect();
        eqs.current[i].disconnect();
        channels.current[i].disconnect();
      });
      players.current = [];
      eqs.current = [];
      channels.current = [];
    };
  }, [tracks]);

  useEffect(() => {
    loaded().then(() => setIsLoaded(true));
  }, [setIsLoaded]);

  return [channels, eqs, isLoaded];
}

export default useChannelStrip;
