// Entry point for the build script in your package.json
import '@hotwired/turbo-rails';
import './controllers';
import React from 'react';
import { createRoot } from 'react-dom/client';
import MenuIcon from './components/header/MenuIcon';
import BellIcon from './components/header/BellIcon';

function mountIcon(targetId, Component) {
  const mountNode = document.getElementById(targetId);
  if (mountNode) {
    const root = createRoot(mountNode);
    root.render(<Component />);
  }
}

function checkIcon() {
  return document.querySelector('#menu-icon svg');
}

document.addEventListener('turbo:render', () => {
  if (!checkIcon()) {
    mountIcon('menu-icon', MenuIcon);
    mountIcon('notification', BellIcon);
  }
});

document.addEventListener('turbo:load', async () => {
  await new Promise((resolve) => { setTimeout(resolve, 0); }); // turbo:renderの発火による描写ラグを考慮
  if (!checkIcon()) {
    mountIcon('menu-icon', MenuIcon);
    mountIcon('notification', BellIcon);
  }
});

mountIcon('menu-icon', MenuIcon);
mountIcon('notification', BellIcon);
