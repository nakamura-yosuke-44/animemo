import React from 'react';
import { createRoot } from 'react-dom/client';
import Follow from './components/follow/Follow';

const mountNode = document.getElementById('follow');
const root = createRoot(mountNode);
root.render(
  <Follow />,
);
