// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import React from "react";
import { createRoot } from "react-dom/client";
import MenuIcon from "./components/header/MenuIcon";
import BellIcon from "./components/header/BellIcon";

function icon(target_id, Component) {
  function mountIcon() {
    const mountNode = document.getElementById(target_id);
    const root = createRoot(mountNode);
    root.render(<Component />);
  }

  function checkIcon() {
    return document.querySelector(`#${target_id} svg`);
  }
  
  document.addEventListener('turbo:render', () => {
    if (!checkIcon()) {
      mountIcon();
    }
  });
  
  document.addEventListener('turbo:load', async () => {
    await new Promise((resolve) => { setTimeout(resolve, 0); }); // turbo:renderの発火による描写ラグを考慮。重複のレンダリング防止
    if (!checkIcon()) {
      mountIcon();
    }
  });
}

icon('menu-icon', MenuIcon);
icon('notification', BellIcon);
