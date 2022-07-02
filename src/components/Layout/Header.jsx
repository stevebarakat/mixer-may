import React from "react";

function Header({ song }) {
  return (
    <div className="header-wrap">
      <div className="logo-wrap">
        <p className="logo">
          <span style={{ color: "var(--blue)" }}>m</span>
          <span style={{ color: "var(--green)" }}>i</span>
          <span style={{ color: "var(--yellow)" }}>x</span>
          <span style={{ color: "var(--pink)" }}>e</span>
          <span style={{ color: "var(--red)" }}>r</span>
          <span style={{ color: "var(--yellow)" }}> </span>
          <span style={{ color: "var(--green)" }}>j</span>
          <span style={{ color: "var(--red)" }}>s</span>
        </p>
        <p style={{ fontWeight: "bold" }}>version 0.0.0.0.1</p>
      </div>
      <div className="song-info">
        <p>Artist: {song.artist}</p>
        <p>Song:{song.name}</p>
        <p>Year:{song.year}</p>
        <p>Studio:{song.studio}</p>
        <p>Location:{song.location}</p>
      </div>
    </div>
  );
}

export default Header;
