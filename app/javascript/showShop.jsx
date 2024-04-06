import React from 'react';
import { createRoot } from 'react-dom/client';
import ShopInfo from './components/show/ShopInfo';

const mountNode = document.getElementById('shop_show');
const root = createRoot(mountNode);
const path = window.location.pathname;
const shopId = path.split('/').pop();
root.render(<ShopInfo shopId={shopId} />);
