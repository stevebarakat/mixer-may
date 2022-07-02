import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children, song }) {
  return (
    <div className="layout-wrap">
      <Header song={song} />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
