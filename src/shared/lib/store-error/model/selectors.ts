import { createSelector } from '@reduxjs/toolkit';

import {
  createModelSelector,
  createModelFieldSelector,
  createHookSelector,
  declareModelStateType,
} from '@shared/lib/store';

import { config } from '../config';

import { ModelState } from './ducks';

const modelSelector = createModelSelector({
  stateType: declareModelStateType<ModelState>(),
  name: config.modelName,
});

const fieldSelector = createModelFieldSelector({
  stateType: declareModelStateType<ModelState>(),
  name: config.modelName,
});

/**
 * Селектор наличия ошибки
 */
const isErrorExistSelector = createSelector(
  modelSelector,
  (model) => !!Object.keys(model ?? {}).length,
);

/**
 * Селектор http статуса ответа сервера
 */
const errorStatusSelector = fieldSelector('status');

/**
 * Селектор кода ошибки
 */
const errorCodeSelector = fieldSelector('code', '');

/**
 * Селектор сообщения о ошибке
 */
const errorMessageSelector = fieldSelector('message', '');

export const selectors = {
  isErrorExist: isErrorExistSelector,
  errorStatus: errorStatusSelector,

  useIsErrorExist: createHookSelector(isErrorExistSelector),
  useErrorStatus: createHookSelector(errorStatusSelector),
  useErrorCode: createHookSelector(errorCodeSelector),
  useErrorMessage: createHookSelector(errorMessageSelector),
};
