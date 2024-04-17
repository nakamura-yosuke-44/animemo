import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function VisitSelect({ currentUser, shopId }) {
  const [initialStatus, setInitialStatus] = useState('');
  const [status, setStatus] = useState('');

  const fetchStatus = async () => {
    try {
      const response = await axios.get(`/api/visits/${currentUser.id}`, {
        params: {
          shop_id: shopId,
        },
      });
      setInitialStatus(response.data.status || '');
    } catch (error) {
      alert('読み込みに失敗しました');
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      const response = await axios.put(`/api/visits/${currentUser.id}`, {
        status: newStatus,
        shop_id: shopId,
      });
      alert(response.data.message);
    } catch (error) {
      alert('更新に失敗しました');
      console.error('Error fetching status', error);
    }
  };

  return (

    <select value={status || initialStatus} onChange={handleStatusChange}>
      <option value="">選択してください</option>
      <option value="went">行った</option>
      <option value="want_to">行きたい</option>
      <option value="pending">保留</option>
    </select>
  );
}

VisitSelect.propTypes = {
  shopId: PropTypes.string,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default VisitSelect;
