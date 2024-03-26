// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import React from "react";
import { createRoot } from "react-dom/client";
import MenuIcon from "./components/header/MenuIcon";

function mountMenuIcon() {
  const mountNode = document.getElementById('menu-icon');
  const root = createRoot(mountNode);
  root.render(<MenuIcon />);
}

function checkMenuIcon() {
  return document.querySelector('#menu-icon svg');
}

document.addEventListener('turbo:render', () => {
  if (!checkMenuIcon()) {
    mountMenuIcon();
  }
});

document.addEventListener('turbo:load', async () => {
  await new Promise((resolve) => { setTimeout(resolve, 0); }); // turbo:renderの発火による描写ラグを考慮
  if (!checkMenuIcon()) {
    mountMenuIcon();
  }
});
