import { useEffect, useLayoutEffect, useRef } from 'react';
import { shallowEqual } from 'react-redux';

import { useActions } from '@shared/lib/use-it';

import { AnyValue, Gate } from '../types';
import { actions } from '../model';

/**
 * Хук для работы с гейтом
 *
 * @param gate гейт
 * @param props пропсы
 *
 * @returns результат
 */
export function useGate<T>(gate: Gate<T>, props: T = null): void {
  const { openGate, closeGate, setGateState } = useActions(actions);

  const propsRef = useRef<{ value: AnyValue; count: number }>({
    value: null,
    count: 0,
  });

  useEffect(() => {
    openGate(gate.id);
    return () => closeGate(gate.id);
  }, [gate]);

  if (!shallowEqual(propsRef.current.value, props)) {
    propsRef.current.value = props;
    propsRef.current.count += 1;
  }

  useLayoutEffect(() => {
    setGateState({ id: gate.id, state: propsRef.current.value });
  }, [propsRef.current.count]);
}
