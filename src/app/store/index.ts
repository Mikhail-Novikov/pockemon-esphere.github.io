import { configureStore as confStore, EnhancedStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { History } from 'history';

import { globalConfig } from '@shared/config';
import { routerModel } from '@shared/lib/store-router';
import { gateMonitor } from '@shared/lib/store-gate';
import { filterMonitor } from '@shared/lib/store-filter';

import rootReducer from './root-reducer';
import { rootSaga } from './root-saga';

const configureStore = (
  preloadedState: unknown = {},
): { store: EnhancedStore; history: History } => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, routerModel.middleware];

  const store = confStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    middleware,
  });

  const history = routerModel.createReduxHistory(store);

  gateMonitor.setContext(store.dispatch);
  filterMonitor.setContext(store.dispatch, store.getState);

  // Включаем redux-saga middleware
  sagaMiddleware.run(rootSaga);

  if (globalConfig.environment !== 'production' && module.hot) {
    module.hot.accept('./root-reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return { store, history };
};

export default configureStore;

export type RootState = ReturnType<typeof rootReducer>;
