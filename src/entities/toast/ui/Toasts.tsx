import React from 'react';
import * as L from 'korus-ui';

import { useActions } from '@shared/lib/use-it';

import { actions, selectors } from '../model';

/**
 * Всплывающие уведомления
 *
 * @returns {React.ReactElement} компонент
 */
export const Toasts: React.FC = () => {
  const toasts = selectors.useToasts();
  const { setToasts } = useActions(actions);

  return (
    <L.Notifications
      _notificationsTop
      value={toasts}
      onChange={(e) => setToasts(e.component.value)}
    />
  );
};
