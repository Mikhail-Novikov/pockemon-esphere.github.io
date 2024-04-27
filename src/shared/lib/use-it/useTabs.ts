import { useCallback, useState } from 'react';
import * as L from 'korus-ui';

export type UseTabsResult<T> = {
  /** Идентификатор активной вкладки */
  activeTabKey: T | undefined;
  /** Установить активную вкладку */
  setTab: (tabKey: T) => void;
  /** Обработчик выбора вкладки */
  onChange: (event: L.TabsTypes.ChangeEvent) => void;
};

/**
 * Хук, предоставляющий методы для работы с L.Tabs
 *
 * @param defaultTabKey - Идентификатор активной вкладки по умолчанию
 *
 * @returns результат
 */
export const useTabs = <T extends string | number = string>(
  defaultTabKey?: T,
): UseTabsResult<T> => {
  const [activeTabKey, setTab] = useState(defaultTabKey);

  const onChange = useCallback((ev: L.TabsTypes.ChangeEvent) => {
    setTab(ev.component.value as T);
  }, []);

  return {
    activeTabKey,
    setTab,
    onChange,
  };
};
