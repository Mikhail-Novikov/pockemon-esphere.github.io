import { PayloadActionCreator } from '@reduxjs/toolkit';

import { PartialState } from '@shared/lib/store';

import { config } from './config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyValue = any;

/** Входные параметры для создания гейта */
export type GateCreateParams<T> = {
  /** id гейта */
  id: string;
  /** начальное состояние */
  defaultState?: T;
};

/** Гейт */
export type Gate<T> = {
  id: string;
  actions: {
    opened: PayloadActionCreator<void>;
    closed: PayloadActionCreator<void>;
    stateChanged: PayloadActionCreator<void>;
  };
  selectors: {
    status: (state: unknown) => boolean;
    state: (state: unknown) => T;
  };
};

export type GateState<T> = {
  /** статус открыт/закрыт */
  status: boolean;
  /** состояние */
  defaultState: T;
  /** состояние */
  state: T;
};

export type AddGatePayload = {
  id: string;
  defaultState: AnyValue;
};

export type SetGateStatePayload = {
  id: string;
  state: AnyValue;
};

export type ModelState = Record<string, GateState<AnyValue>>;

export type ModelStoreState = PartialState<typeof config.modelName, ModelState>;
