import { combineReducers } from '@reduxjs/toolkit';

import { gateModel } from '@shared/lib/store-gate';
import { errorModel } from '@shared/lib/store-error';
import { loaderModel } from '@shared/lib/store-loader';
import { routerModel } from '@shared/lib/store-router';
import { filterModel } from '@shared/lib/store-filter';

import { toastModel } from '@entities/toast';
import { taskModel } from '@entities/task';

const rootReducer = combineReducers({
  /** shared */
  [gateModel.config.modelName]: gateModel.reducer,
  [errorModel.config.modelName]: errorModel.reducer,
  [loaderModel.config.modelName]: loaderModel.reducer,
  [routerModel.config.modelName]: routerModel.reducer,
  [filterModel.config.modelName]: filterModel.reducer,

  /** entities */
  [toastModel.config.modelName]: toastModel.reducer,
  [taskModel.config.modelName]: taskModel.reducer,

  /** features */

  /** pages */

  /** processes */
});

export default rootReducer;
