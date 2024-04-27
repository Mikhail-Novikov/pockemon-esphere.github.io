import {
  createSlice,
  PayloadAction,
  PayloadActionCreator,
} from '@reduxjs/toolkit';

import { createActionCreatorWithPrefix } from '@shared/lib/store';

import { AddGatePayload, ModelState, SetGateStatePayload } from '../types';
import { config } from '../config';

const createAction = createActionCreatorWithPrefix(config.modelName);

/**
 * Начальное состояние модели
 */
const initialState: ModelState = {};

/**
 * Экшен. Установить состояние гейта
 */
const setGateState = createAction<SetGateStatePayload>('setGateState');

/**
 * Экшен. Открыть гейт
 */
const openGate = createAction<string>('openGate');

/**
 * Экшен. Закрыть гейт
 */
const closeGate = createAction<string>('closeGate');

/**
 * Создать экшен для события
 * @param id - id гейта
 * @param kind - тип события
 * @returns Экшен
 */
const createEventAction = (
  id: string,
  kind: 'opened' | 'closed' | 'changed',
): PayloadActionCreator<void> => createAction(`${kind}_${id}`);

/**
 * Cлайс модели
 */
const gateSlice = createSlice({
  name: config.modelName,
  initialState,
  reducers: {
    add(
      state,
      { payload: { id, defaultState } }: PayloadAction<AddGatePayload>,
    ) {
      state[id] = { defaultState, state: defaultState, status: false };
    },

    remove(state, { payload: id }: PayloadAction<string>) {
      delete state[id];
    },

    open(state, { payload: id }: PayloadAction<string>) {
      if (!state[id]) {
        return;
      }
      state[id].status = true;
    },

    close(state, { payload: id }: PayloadAction<string>) {
      if (!state[id]) {
        return;
      }
      state[id].status = false;
    },

    setState(
      state,
      { payload: { id, state: gateState } }: PayloadAction<SetGateStatePayload>,
    ) {
      if (!state[id]) {
        return;
      }
      state[id].state = gateState;
    },
  },
});

export const { reducer } = gateSlice;

export const actions = {
  ...gateSlice.actions,
  setGateState,
  openGate,
  closeGate,
  createEventAction,
};
