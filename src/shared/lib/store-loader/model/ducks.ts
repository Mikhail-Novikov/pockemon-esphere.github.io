import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { config } from '../config';

export type ModelState = {
  /** Индикаторы загрузки */
  [x: string]: boolean | undefined;
};

/**
 * Начальное состояние модели
 */
const initialState: ModelState = {};

/**
 * Cлайс модели
 */
const loaderSlice = createSlice({
  name: config.modelName,
  initialState,
  reducers: {
    show: (state, { payload }: PayloadAction<string>) => {
      state[payload] = true;
    },
    hide: (state, { payload }: PayloadAction<string>) => {
      delete state[payload];
    },
  },
});

export const { actions, reducer } = loaderSlice;
