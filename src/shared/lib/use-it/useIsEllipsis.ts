import { useState, useRef, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import * as L from 'korus-ui';

type UseIsEllipsisResult<TRef> = [React.MutableRefObject<TRef>, boolean];

/**
 * Хук проверяет блок на ellipsis
 *
 * @param value значение
 * @param ellipsisElement проверяемый элемент
 * @returns результат
 */
export const useIsEllipsis = <
  R extends L.commonTypes.CommonRefCurrent,
  T = unknown
>(
  value: T,
  ellipsisElement?: (ref: R) => HTMLElement,
): UseIsEllipsisResult<R> => {
  const [isEllipsis, setIsEllipsis] = useState(false);
  const ref = useRef<R>();

  const getElement = () =>
    ellipsisElement?.(ref.current) ?? ref.current?.wrapper;

  const targetRef = useRef(getElement());

  const onResize = () => {
    const element = getElement();
    const boundingClientRect = element?.getBoundingClientRect();
    const width = Math.ceil(boundingClientRect?.width);
    const height = Math.ceil(boundingClientRect?.height);

    setIsEllipsis(
      element?.scrollWidth > width || element?.scrollHeight > height,
    );
  };

  useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 300,
    onResize,
    targetRef,
  });

  useEffect(() => {
    onResize();
  }, [value]);

  return [ref, isEllipsis];
};
