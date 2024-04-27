import { config } from './config';
import { reducer, actions as toastActions } from './model';

const { showToast } = toastActions;

/** Модель toast */
export const toastModel = {
  config,
  reducer,
  actions: {
    showToast,
  },
};

export { ToastType } from './types';
export { Toasts } from './ui/Toasts';
