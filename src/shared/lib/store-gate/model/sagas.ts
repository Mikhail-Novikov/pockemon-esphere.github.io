import { shallowEqual } from 'react-redux';
import { SagaIterator } from 'redux-saga';
import { all, select, put, takeEvery, call } from 'redux-saga/effects';

import { composeSaga, passActionPayload } from '@shared/lib/store';

import { SetGateStatePayload } from '../types';

import { actions } from './ducks';
import { selectors } from './selectors';

/**
 * Изменить state гейта
 *
 * @returns {void}
 */
function* setGateStateSaga({
  id,
  state: newState,
}: SetGateStatePayload): SagaIterator {
  const gate: ReturnType<typeof selectors.gate> = yield select(selectors.gate, {
    id,
  });

  if (!gate) {
    return;
  }

  const { state: prevState } = gate;

  const isChanged = !shallowEqual(prevState, newState);

  if (isChanged) {
    yield put(actions.setState({ id, state: newState }));
    yield put(actions.createEventAction(id, 'changed')());
  }
}

/**
 * Открыть Gate
 * @param id - id гейта
 * @returns {void}
 */
function* openGateSaga(id: string): SagaIterator {
  const gate: ReturnType<typeof selectors.gate> = yield select(selectors.gate, {
    id,
  });

  if (!gate) {
    return;
  }

  yield put(actions.open(id));
  yield put(actions.createEventAction(id, 'opened')());
}

/**
 * Закрыть Gate
 * @param id - id гейта
 * @returns {void}
 */
function* closeGateSaga(id: string): SagaIterator {
  const gate: ReturnType<typeof selectors.gate> = yield select(selectors.gate, {
    id,
  });

  if (!gate) {
    return;
  }

  yield put(actions.close(id));
  yield put(actions.createEventAction(id, 'closed')());

  yield call(setGateStateSaga, { id, state: gate.defaultState });
}

/**
 * Вотчер
 * @returns {void}
 */
function* watcher(): SagaIterator<void> {
  yield all([
    takeEvery(
      actions.setGateState,
      composeSaga(setGateStateSaga, [passActionPayload]),
    ),
    takeEvery(actions.openGate, composeSaga(openGateSaga, [passActionPayload])),
    takeEvery(
      actions.closeGate,
      composeSaga(closeGateSaga, [passActionPayload]),
    ),
  ]);
}

export const sagas = {
  watcher,
};
