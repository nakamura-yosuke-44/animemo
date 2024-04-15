import React from 'react';
import { createRoot } from 'react-dom/client';
import Profile from './components/profile/Profile';

const mountNode = document.getElementById('profile');
const userName = mountNode.dataset.userName
const root = createRoot(mountNode);
root.render(
  <Profile userName={userName} />
)
