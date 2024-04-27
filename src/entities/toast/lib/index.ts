import { utils, NotificationsTypes } from 'korus-ui';

import { Toast, ToastType } from '../types';

const TOAST_TYPE_DICTIONARY = {
  [ToastType.Success]: 'prodicon-success txt-success',
  [ToastType.Info]: 'prodicon-info-fill',
  [ToastType.Error]: 'prodicon-error txt-danger',
};

/**
 * Создает оповещение
 *
 * @param {Toast} toast - toast
 *
 * @returns {NotificationsTypes.Item} Оповещение
 */
export const createNotice = ({
  type,
  text,
  delay = 5000,
}: Toast): NotificationsTypes.Item => ({
  id: utils.generateId(),
  iconClassName: TOAST_TYPE_DICTIONARY[type],
  text,
  delay,
});
