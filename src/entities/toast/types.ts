import { NotificationsTypes } from 'korus-ui';

/** Тип всплывающего уведомления */
export enum ToastType {
  Success,
  Info,
  Error,
}

/** Всплывающее уведомление */
export type Toast = Pick<NotificationsTypes.Item, 'text' | 'delay'> & {
  type: ToastType;
};
