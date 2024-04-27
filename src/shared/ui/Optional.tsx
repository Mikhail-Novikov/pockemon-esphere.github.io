import React from 'react';

type OptionalProps = {
  /** условие */
  when: boolean;
};

/**
 * Компонент с опциональным рендерингом
 *
 * @param props пропсы
 *
 * @returns компонент
 */

export const Optional: React.FC<OptionalProps> = ({ when, children }) =>
  when ? <>{children}</> : null;
