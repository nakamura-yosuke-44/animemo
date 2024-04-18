import React from 'react';
import { createRoot } from 'react-dom/client';
import FollowPosts from './components/follow/FollowPosts';

const mountNode = document.getElementById('follow_posts');
const root = createRoot(mountNode);
root.render(
  <FollowPosts />,
);