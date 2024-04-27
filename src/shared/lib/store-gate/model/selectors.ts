import { createSelector } from '@reduxjs/toolkit';

import {
  createModelSelector,
  createParameterSelector,
  declareModelStateType,
} from '@shared/lib/store';

import { config } from '../config';

import { ModelState } from '../types';

const modelSelector = createModelSelector({
  stateType: declareModelStateType<ModelState>(),
  name: config.modelName,
});

/** Селектор. Параметр - id гейта */
const gateIdParamSelector = createParameterSelector(
  (params: { id: string }) => params.id,
);

/**
 * Селектор. Гейт
 */
const gateSelector = createSelector(
  modelSelector,
  gateIdParamSelector,
  (gates, id) => (id ? gates[id] : null),
);

/**
 * Селектор. Состояние гейта
 */
const gateStateSelector = createSelector(gateSelector, (gate) => gate?.state);

/**
 * Селектор. Статус гейта
 */
const gateStatusSelector = createSelector(gateSelector, (gate) => gate?.status);

export const selectors = {
  gate: gateSelector,
  state: gateStateSelector,
  status: gateStatusSelector,
};
