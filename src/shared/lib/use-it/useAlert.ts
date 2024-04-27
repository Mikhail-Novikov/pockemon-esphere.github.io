import { useCallback, useState } from 'react';

export type UseAlertResult<T> = {
  /** Идентификатор активного Alert */
  activeAlertKey: T | undefined;

  /** показать Alert */
  openAlert: (alertKey: T) => void;

  /** Закрыть Alert */
  closeAlert: () => void;
};

/**
 * Хук, предоставляющий методы открытия/закрытия alert окна
 *
 * @param defaultAlertKey - уникальный ключ alert-окна по умолчанию
 *
 * @returns результат
 */
export const useAlert = <T extends string | null = string>(
  defaultAlertKey?: T,
): UseAlertResult<T> => {
  const [activeAlertKey, setActiveAlertKey] = useState(defaultAlertKey);

  const openAlert = useCallback((alertKey: T) => {
    setActiveAlertKey(alertKey);
  }, []);

  const closeAlert = useCallback(() => {
    setActiveAlertKey(null);
  }, []);

  return {
    activeAlertKey,
    openAlert,
    closeAlert,
  };
};
