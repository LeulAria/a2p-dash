import React, { useContext, useEffect, useState } from 'react';

import { useFireQuery } from '../../FireQuery';
import NotificationContent from './NotificationContent';
import { AuthContext } from '../../contexts/auth/AuthProvider';

export default function TemporaryDrawer() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const { user } = useContext(AuthContext);

  const {
    data, loading,
  } = useFireQuery(
    `notifications/${user.uid}/notifications`,
    {
      orderBy: ['createdAt desc'],
      limit: 6,
      snapshotListener: true,
    },
  );

  useEffect(() => {
    if (data) {
      setNotifications(data);
      Notification.requestPermission().then(
        () => new Notification(
          `Hello 👋 ${
            user.userName || user.clientName
          } Your have new notification 🔔!`,
        ),
      );
    }
  }, [data]);

  return (
    <div>
      <NotificationContent notifications={notifications} loading={loading} />
    </div>
  );
}
