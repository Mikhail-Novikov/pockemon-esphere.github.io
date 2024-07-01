import { SagaIterator } from 'redux-saga';
import { call, all, fork } from 'redux-saga/effects';

import { gateModel } from '@shared/lib/store-gate';

import { initAppModel } from '@processes/init';
import { pokemonListPageModel } from '@pages/pokemon-list';
import { filterModel } from '@src/processes/filter';
import { pokemonItemPageModel } from '@pages/pokemon-item';

/**
 * Главная сага - точка входа
 *
 * @returns {void}
 */
export function* rootSaga(): SagaIterator {
  // eslint-disable-next-line no-console
  yield call(console.log, 'Root Saga Runner...!');

  yield all(
    [
      /** shared */
      gateModel.sagas.watcher,

      /** entities */

      /** features */

      /** pages */
      pokemonListPageModel.sagas.watcher,
      pokemonItemPageModel.sagas.watcher,

      /** proccesses */
      initAppModel.sagas.watcher,
      filterModel.sagas.watcher,
    ].map(fork),
  );
}
