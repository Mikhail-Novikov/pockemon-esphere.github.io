import { Saga, SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';

import { SagaWrapperParams } from '@shared/lib/store';
import {
  createTrouble,
  combineTroubleActions,
  TroubleAction,
} from '@shared/lib/trouble';

import { ErrorHandlerParams, UnhandledErrorsStrategy } from '../types';

/** Trouble для обработки ошибок по-умолчанию */
export const defaultTrouble = createTrouble();

/**
 * Итерация действий для обработки ошибки
 * @param actions - действия
 * @param error - ошибка
 *
 * @returns {void}
 */
function* forEachTroubleActionSaga(actions: TroubleAction[], error: Error) {
  for (const action of actions) {
    yield call(action, error);
  }
}

/**
 * Сага для обработки ошибок
 *
 * @param error - ошибка
 * @param params - параметры
 *
 * @returns {void}
 */
function* errorHandlerSaga(
  error: Error,
  params?: ErrorHandlerParams,
): SagaIterator {
  const {
    trouble,
    unhandledErrorsStrategy: strategy = UnhandledErrorsStrategy.UseDefault,
  } = params || {};

  if (trouble && strategy === UnhandledErrorsStrategy.Throw) {
    const {
      matchedActions,
      otherwiseActions,
      alwaysActions,
    } = trouble.getSplittedActions(error);

    const isHandled = matchedActions.length > 0 || otherwiseActions.length > 0;

    const troubleActions = [
      ...matchedActions,
      ...otherwiseActions,
      ...alwaysActions,
    ];

    yield call(forEachTroubleActionSaga, troubleActions, error);

    if (!isHandled) {
      throw error;
    } else {
      const {
        alwaysActions: defaultAlwaysActions,
      } = defaultTrouble.getSplittedActions(error);

      yield call(forEachTroubleActionSaga, defaultAlwaysActions, error);
    }
  } else {
    const troubleActions = combineTroubleActions({
      parent: defaultTrouble,
      child: trouble,
      error,
    });

    yield call(forEachTroubleActionSaga, troubleActions, error);
  }
}

/**
 * Параметры саги, которая оборачивает сагу в обработчик ошибок
 */
type WithErrorHandlerParams<TSaga extends Saga> = SagaWrapperParams<TSaga> & {
  /** trouble для обработки ошибок */
  params?: ErrorHandlerParams;
};

/**
 * Оборачивает сагу в обработчик ошибок
 *
 * @param params - параметры
 *
 * @returns результат
 */
function* withErrorHandlerSaga<TSaga extends Saga>({
  saga,
  params,
  args,
}: WithErrorHandlerParams<TSaga>): SagaIterator<ReturnType<TSaga>> {
  try {
    return yield call(saga, ...args);
  } catch (error) {
    return yield call(errorHandlerSaga, error, params);
  }
}

export const sagas = {
  withErrorHandler: withErrorHandlerSaga,
};
