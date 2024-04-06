import React from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import ShopSearch from './components/search/ShopSearch';

const mountNode = document.getElementById('shop_index');
const root = createRoot(mountNode);

async function indexShop() {
  try {
    const response = await axios.get('/api/shops');
    const { arryPrefecture, arrySeason } = response.data;
    root.render(
      <ShopSearch arryPrefecture={arryPrefecture} arrySeason={arrySeason} />,
    );
  } catch (error) {
    console.error('データ取得エラー:', error);
  }
}

indexShop();
