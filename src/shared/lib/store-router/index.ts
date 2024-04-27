import { combineReducers } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';

import {
  queryParamsReducer,
  selectors,
  sagas,
  createQueryParamChangedPredicate as queryParamChanged,
} from './model';
import { config } from './config';
import { ModelState } from './types';

const {
  createReduxHistory,
  routerReducer,
  routerMiddleware: middleware,
} = createReduxHistoryContext({
  history: config.history,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  selectRouterState: selectors.router,
});

const reducer = combineReducers<ModelState>({
  router: routerReducer,
  query: queryParamsReducer,
});

/**
 * Модель router
 */
export const routerModel = {
  config,
  createReduxHistory,
  reducer,
  middleware,
  actions: {
    queryParamChanged,
  },
  selectors,
  sagas,
};
