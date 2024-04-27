import { createSelector } from '@reduxjs/toolkit';

import {
  createModelFieldSelector,
  createModelSelector,
  declareModelStateType,
} from '@shared/lib/store';

import { config } from '../config';
import { ModelState, QueryParams } from '../types';

/**
 * Селектор состояния модели
 */
const modelSelector = createModelSelector({
  stateType: declareModelStateType<ModelState>(),
  name: config.modelName,
});

const fieldSelector = createModelFieldSelector({
  stateType: declareModelStateType<ModelState>(),
  name: config.modelName,
});

/**
 * Селектор. Роутер
 */
const routerSelector = fieldSelector('router');

/**
 * Селектор. URL без search и hash
 */
const pathNameSelector = createSelector(
  modelSelector,
  ({ router }): string => router.location.pathname ?? '/',
);

/**
 * Селектор. Якорная ссылка
 */
const hashSelector = createSelector(
  modelSelector,
  ({ router }): string => router.location.hash ?? '',
);

/**
 * Селектор. Query-params в виде объекта
 */
const queryParamsSelector = createSelector(
  modelSelector,
  ({ query }): QueryParams => query,
);

/**
 * Селектор. Query-params в виде строки
 */
const searchStringSelector = createSelector(
  modelSelector,
  ({ router }): string => router.location.search ?? '',
);

/**
 * Селектор. URL страницы целиком
 */
const pathSelector = createSelector(
  pathNameSelector,
  searchStringSelector,
  hashSelector,
  (pathName, search, hash): string => `${pathName}${search}${hash}`,
);

/**
 * Селектор. LocationState
 */
const stateSelector = createSelector(
  modelSelector,
  ({ router }) => router.location.state,
);

export const selectors = {
  router: routerSelector,
  path: pathSelector,
  pathName: pathNameSelector,
  hash: hashSelector,
  queryParams: queryParamsSelector,
  searchString: searchStringSelector,
  state: stateSelector,
};
