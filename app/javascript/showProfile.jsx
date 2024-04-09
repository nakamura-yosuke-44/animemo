import React from 'react';
import { createRoot } from 'react-dom/client';
import ShowProfile from './components/profile/ShowProfile';

const mountNode = document.getElementById('profile');
const root = createRoot(mountNode);
const path = window.location.pathname;
const profileId = path.split('/').pop();
root.render(
  <ShowProfile profileId={profileId} />
)
