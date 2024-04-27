import { SagaIterator } from 'redux-saga';
import { put, call, SagaReturnType } from 'redux-saga/effects';

import { todoApi } from '@shared/api';
import { composeSaga } from '@shared/lib/store';
import { loader } from '@shared/lib/store-loader';

import { config } from '../config';

import { actions } from './ducks';

/**
 * Загрузка списка задач
 *
 * @returns {void}
 */
function* loadTasksSaga(): SagaIterator {
  const tasks: SagaReturnType<typeof todoApi.getTasksList> = yield call(
    todoApi.getTasksList,
  );

  yield put(actions.setTasks(tasks));
}

export const sagas = {
  loadTasks: composeSaga(loadTasksSaga, [loader(config.loaders.loadTasks)]),
};
