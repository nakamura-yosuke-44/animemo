// Entry point for the build script in your package.json
import '@hotwired/turbo-rails';
import './controllers';
import React from 'react';
import { createRoot } from 'react-dom/client';
import MenuIcon from './components/header/MenuIcon';
import BellIcon from './components/header/BellIcon';

function icon(targetId, Component) {
  const mountNode = document.getElementById(targetId);
  if (mountNode) {
    function mountIcon() {
      const root = createRoot(mountNode);
      root.render(<Component />);
    }

    function checkIcon() {
      return document.querySelector(`#${targetId} svg`);
    }

    document.addEventListener('turbo:render', () => {
      if (!checkIcon()) {
        mountIcon();
      }
    });

    document.addEventListener('turbo:load', async () => {
      await new Promise((resolve) => { setTimeout(resolve, 0); }); // turbo:renderの発火によるラグを考慮。重複防止
      if (!checkIcon()) {
        mountIcon();
      }
    });
  }
}

icon('menu-icon', MenuIcon);
icon('notification', BellIcon);
