import React from 'react';
import * as L from 'korus-ui';

import { config } from '../config';
import { selectors } from '../model';

/**
 * Глобальный индикатор загрузки
 *
 * @returns компонент
 */
export const GlobalLoader: React.FC = ({ children }) => {
  const isGlobalLoading = selectors.useLoader(config.globalLoader);

  if (isGlobalLoading) {
    return <L.Loader isLoading isGlobal />;
  }

  return <>{children}</>;
};
