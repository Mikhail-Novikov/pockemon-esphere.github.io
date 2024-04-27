import React from 'react';
import * as L from 'korus-ui';

interface UseCollapseResult {
  /** Активный ключ панели */
  activePanelKey: L.CollapseTypes.KeyState;
  /** Установка активного ключа */
  setActivePanelKey: React.Dispatch<
    React.SetStateAction<L.CollapseTypes.KeyState>
  >;
  /** Обработчик клика по панели */
  onSelect: (event: L.CollapseTypes.SelectEvent) => void;
}

/**
 * Хук для работы с компонентом Collapse
 * @param {L.CollapseTypes.KeyState} defaultPanelKey - Ключ панели по-умолчанию
 * @returns {UseCollapseResult} Результат
 */
export const useCollapse = (
  defaultPanelKey: L.CollapseTypes.KeyState = null,
): UseCollapseResult => {
  const [activePanelKey, setActivePanelKey] = React.useState<
    L.CollapseTypes.KeyState
  >(defaultPanelKey);

  const onSelect = ({ component: { value } }: L.CollapseTypes.SelectEvent) => {
    setActivePanelKey(value);
  };

  return {
    activePanelKey,
    setActivePanelKey,
    onSelect,
  };
};
