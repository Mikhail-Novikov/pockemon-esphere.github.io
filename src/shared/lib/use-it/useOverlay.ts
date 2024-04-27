import { useState, useCallback } from 'react';

type OverlayKey = string | number;

export type UseOverlayHook<T> = {
  /** Идентификатор активного Overlay, может быть несколько */
  activeOverlayKey: T[];

  /** показать Overlay */
  openOverlay: (overlayKey: T) => void;

  /** Закрыть Overlay, если key не указан то закроет все Overlay  */
  closeOverlay: (key?: T) => void;
};

/**
 * Хук, предоставляющий методы для работы с L.LightBox.Overlay
 *
 * @param {T} defaultOverlayKeys - индентификатор активного Overlay по-умолчанию
 *
 * @returns {UseOverlayHook} Результат
 */
export const useOverlay = <T extends OverlayKey = OverlayKey>(
  defaultOverlayKeys: T[] = [],
): UseOverlayHook<T> => {
  const [activeOverlayKey, setActiveOverlayKey] = useState<T[]>(
    defaultOverlayKeys,
  );

  const openOverlay = useCallback((overlayKey: T) => {
    setActiveOverlayKey((prev) =>
      !prev.includes(overlayKey) ? [...prev, overlayKey] : prev,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeOverlay = useCallback((key?: T) => {
    if (!key) {
      setActiveOverlayKey([]);
      return;
    }

    setActiveOverlayKey((prev) =>
      // eslint-disable-next-line max-nested-callbacks
      prev.filter((currentKey) => currentKey !== key),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    activeOverlayKey,
    openOverlay,
    closeOverlay,
  };
};
