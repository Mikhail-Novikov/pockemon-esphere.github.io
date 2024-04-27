import { useState } from 'react';

type UseSwitchParams = {
  [x: string]: boolean;
};

export type UseSwitchHook<T> = {
  /** переключатели */
  switches: T;

  /** переключить */
  toggle: (switchKey: keyof T) => void;

  /** выключить */
  off: () => void;
};

/**
 * Хук для работы с переключателями
 *
 * @param initialValue - объект с переключателями
 *
 * @returns Результат
 */
export const useSwitch = <T extends UseSwitchParams = UseSwitchParams>(
  initialValue: T,
): UseSwitchHook<T> => {
  const switchesOffState = Object.fromEntries(
    Object.keys(initialValue).map((key) => [key, false]),
  ) as T;

  const [switches, setSwitches] = useState<T>(initialValue);

  const toggle = (switchKey: keyof T) =>
    setSwitches((prevState) => ({
      ...switchesOffState,
      [switchKey]: !prevState[switchKey],
    }));

  const off = () => setSwitches(switchesOffState);

  return {
    switches,
    toggle,
    off,
  };
};
