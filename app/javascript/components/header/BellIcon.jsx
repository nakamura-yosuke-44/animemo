import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscBellDot, VscBell } from 'react-icons/vsc';

function BellIcon() {
  const [uncheckedNotifications, setuncheckedNotifications] = useState(null);

  const fetchUncheckedNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications');
      setuncheckedNotifications(response.data);
    } catch (error) {
      alert('通知を取得できませんでした');
      console.error('Error fetching unnotifications :', error);
    }
  };

  useEffect(() => {
    fetchUncheckedNotifications();
  }, []);

  return (
    uncheckedNotifications?.length > 0 ? (
      <a href="/notifications">
        <VscBellDot size={20} color="#ffffff" />
      </a>
    ) : (

      <VscBell size={20} color="#ffffff" />

    )
  );
}

export default BellIcon;
