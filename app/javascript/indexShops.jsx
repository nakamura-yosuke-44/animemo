import React from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import ShopSearch from './components/search/ShopSearch';


async function indexColors () {
  try {
    const response = await axios.get('/api/shops');
    const { arryPrefecture, arrySeason } = response.data;
    const mountNode = document.getElementById('shop_index');
    createRoot(mountNode).render(
      <ShopSearch arryPrefecture={arryPrefecture} arrySeason={arrySeason} />,
    );
  } catch (error) {
    console.error('データ取得エラー:', error);
  }
}

indexColors()