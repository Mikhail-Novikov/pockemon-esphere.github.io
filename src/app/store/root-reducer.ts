import { combineReducers } from '@reduxjs/toolkit';

import { gateModel } from '@shared/lib/store-gate';
import { errorModel } from '@shared/lib/store-error';
import { loaderModel } from '@shared/lib/store-loader';
import { routerModel } from '@shared/lib/store-router';

import { toastModel } from '@entities/toast';
// eslint-disable-next-line import/no-cycle
import { pokemonModel } from '@entities/pokemon';
// eslint-disable-next-line import/no-cycle
import { filterModel } from '@src/processes/filter';

const rootReducer = combineReducers({
  /** shared */
  [gateModel.config.modelName]: gateModel.reducer,
  [errorModel.config.modelName]: errorModel.reducer,
  [loaderModel.config.modelName]: loaderModel.reducer,
  [routerModel.config.modelName]: routerModel.reducer,

  /** entities */
  [toastModel.config.modelName]: toastModel.reducer,
  [pokemonModel.config.modelName]: pokemonModel.reducer,

  /** features */

  /** pages */

  /** processes */
  [filterModel.config.modelName]: filterModel.reducer,
});

export default rootReducer;
