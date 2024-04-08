import React from 'react';
import { createRoot } from 'react-dom/client';
import MyList from './components/myPages/MyList';


const mountNode = document.getElementById('mylist');
const root = createRoot(mountNode);
root.render(
  <MyList />,
)

MyList();
