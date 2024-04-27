import { Dispatch } from '@reduxjs/toolkit';

import { AnyValue, GateCreateParams } from './types';
import { actions } from './model';

type Context = {
  dispatch: Dispatch;
};

let gates: GateCreateParams<AnyValue>[] = [];
const context: Context = {
  dispatch: null,
};

export const setContext = (dispatch: Dispatch): void => {
  context.dispatch = dispatch;
  gates.forEach(({ id, defaultState }) =>
    dispatch(actions.add({ id, defaultState })),
  );

  gates = [];
};

export const addGate = (gateCreateParams: GateCreateParams<AnyValue>): void => {
  const { id, defaultState } = gateCreateParams;

  if (context.dispatch) {
    context.dispatch(actions.add({ id, defaultState }));
  } else {
    gates.push(gateCreateParams);
  }
};
