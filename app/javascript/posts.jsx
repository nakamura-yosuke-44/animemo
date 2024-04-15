import React from 'react';
import { createRoot } from 'react-dom/client';
import Posts from './components/post/Posts';

const mountNode = document.getElementById('posts');
const root = createRoot(mountNode);
root.render(
  <Posts />,
);
