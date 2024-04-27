import { DependencyList, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import {
  PartialState,
  createModelSelector,
  declareModelStateType,
} from '@shared/lib/store';

import { config } from '../config';

import { ModelState } from './ducks';

type State = PartialState<typeof config.modelName, ModelState>;

/**
 * Селектор состояния модели
 */
const modelSelector = createModelSelector({
  stateType: declareModelStateType<ModelState>(),
  name: config.modelName,
});

/** Создает селектор признака загрузки для одного лоадера */
const makeLoadingSelector = () =>
  createSelector(
    modelSelector,
    (_: unknown, loader: string) => loader,
    (state, loader) => (loader ? state[loader] ?? false : false),
  );

/** Создает селектор признака загрузки для списка лоадеров */
const makeSomeLoadingSelector = () =>
  createSelector(
    modelSelector,
    (_: unknown, loaders: string[]) => loaders,
    (state, loaders) =>
      loaders
        ?.map((loader) => (loader ? state[loader] ?? false : false))
        ?.some(Boolean) ?? false,
  );

export const selectors = {
  isLoading: makeLoadingSelector(),

  useLoader: (loader: string): boolean => {
    const isLoadingSelector = useMemo(makeLoadingSelector, []);
    return useSelector((state: State) => isLoadingSelector(state, loader));
  },

  useSomeLoader: (
    loaders: string[],
    deps: DependencyList | undefined = [],
  ): boolean => {
    const memoizedLoaders = useMemo(() => loaders, deps);

    const isSomeLoadingSelector = useMemo(makeSomeLoadingSelector, []);

    return useSelector((state: State) =>
      isSomeLoadingSelector(state, memoizedLoaders),
    );
  },
};
