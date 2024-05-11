import React from 'react';
import * as L from 'korus-ui';

import { GlobalLoader } from '@shared/lib/store-loader';
import { errorModel } from '@shared/lib/store-error';

import { Toasts } from '@entities/toast';

import { GlobalError } from '@features/global-error';

import { Header } from './Header';
import { Footer } from './Footer';

/**
 * ### Базовый макет страницы
 *
 * @returns Базовый макет страницы
 */
export const MainWidget: React.FC = ({ children }) => {
  const isErrorExist = errorModel.selectors.useIsErrorExist();

  return (
    <GlobalLoader>
      <L.Div _gridDocuments>
        <Header />

        <L.Div className="wrapper document-body width-100">
          <L.Main className="content-box items margin-y">
            {isErrorExist ? <GlobalError /> : children}
          </L.Main>
        </L.Div>
      </L.Div>

      <Toasts />
      <Footer />
    </GlobalLoader>
  );
};
