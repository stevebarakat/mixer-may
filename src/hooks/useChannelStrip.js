import { useEffect, useRef, useState } from "react";
import { loaded, Channel, Player, Destination, Transport as t } from "tone";

function useChannelStrip({ tracks }) {
  const channels = useRef([]);
  const players = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loaded().then(() => setIsLoaded(true));
  }, [setIsLoaded]);

  useEffect(() => {
    // create audio nodes
    for (let i = 0; i < tracks.length; i++) {
      channels.current = [
        ...channels.current,
        new Channel(tracks[i].volume, tracks[i].pan).connect(Destination),
      ];
      players.current = [...players.current, new Player(tracks[i].path)];
    }

    // connect everything
    // players.current.forEach((player, i) =>
    //   player.chain(channels.current[i]).sync().start()
    // );

    return () => {
      t.stop();
      players.current.forEach((player, i) => {
        player.disconnect();
        channels.current[i].disconnect();
      });
      players.current = [];
      channels.current = [];
    };
  }, [tracks]);

  return [channels, isLoaded];
}

export default useChannelStrip;
