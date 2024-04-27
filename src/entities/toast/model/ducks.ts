import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationsTypes } from 'korus-ui';

import { Toast } from '../types';
import { createNotice } from '../lib';
import { config } from '../config';

const initialState: NotificationsTypes.Item[] = [];

export type ModelState = typeof initialState;

/** Cлайс модели */
const toastSlice = createSlice({
  name: config.modelName,
  initialState,
  reducers: {
    showToast: (state, { payload: toast }: PayloadAction<Toast>) => {
      state.push(createNotice(toast));
    },

    setToasts: (_, { payload }: PayloadAction<typeof initialState>) => payload,

    reset: () => initialState,
  },
});

export const { reducer, actions } = toastSlice;
