import { setStoreField } from '@shared/lib/store';
import { Pagination } from '@shared/types';

import { createSlice } from '@reduxjs/toolkit';
import { config } from '../config';

const initialState = {
  paging: {} as Pagination,
};

export type ModelState = typeof initialState;

/** Cлайс модели */
const filterSlice = createSlice({
  name: config.modelName,
  initialState,
  reducers: {
    setPaging: setStoreField('paging'),

    reset: () => initialState,
  },
});

export const { reducer, actions } = filterSlice;
