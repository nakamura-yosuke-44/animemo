import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VisitSelect = ({ currentUser, shopId }) => {
  const [initialStatus, setInitialStatus] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await axios.get(`/api/visits/${currentUser.id}`, {
        params: {
          shop_id: shopId
        }
      });
      setInitialStatus(response.data.status || '');
    } catch (error) {
      alert('読み込みに失敗しました')
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      await axios.put(`/api/visits/${currentUser.id}`, {
        status: newStatus,
        shop_id: shopId
      });
      alert('更新しました')

    } catch (error) {
      alert('更新に失敗しました')
    }
  };

  return (

    <select value={status || initialStatus } onChange={handleStatusChange}>
      <option value="">選択してください</option>
      <option value="went">行った</option>
      <option value="want_to">行きたい</option>
      <option value="pending">保留</option>
    </select>
  );
};

export default VisitSelect;