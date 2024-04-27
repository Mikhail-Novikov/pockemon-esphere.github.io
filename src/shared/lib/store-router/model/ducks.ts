import type { Location, Action as HistoryAction } from 'history';
import { Action, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LOCATION_CHANGE } from 'redux-first-history';

import { createActionCreatorWithPrefix } from '@shared/lib/store';

import { config } from '../config';
import { QueryParams } from '../types';
import { isQueryParamsEquals, parseSearchString } from '../lib';

type Predicate<T> = (arg: T) => boolean;
type ActionPredicate<Guard extends Action = Action> = Predicate<Guard>;

const createAction = createActionCreatorWithPrefix(config.modelName);

/** Экшн-событие. Изменилось значение query параметра  */
const queryParamChanged = createAction<string>('queryParamChanged');

/**
 * Создать ActionPredicate для действия queryParamChanged
 * @param queryParamName имя query параметра
 * @returns результат
 */
export const createQueryParamChangedPredicate = (
  queryParamName: string,
): ActionPredicate => ({ type, payload }: PayloadAction<string>) => {
  const isCorrectType = type === queryParamChanged.type;
  const isCorrectPayload = queryParamName === payload;

  return isCorrectType && isCorrectPayload;
};

const queryParamsInitialState: QueryParams = {};

/** Cлайс query-параметров */
const queryParamsSlice = createSlice({
  name: 'query',
  initialState: queryParamsInitialState,
  reducers: {},
  extraReducers: {
    [LOCATION_CHANGE]: (
      state,
      {
        payload,
      }: PayloadAction<{
        location: Location;
        action: HistoryAction;
      }>,
    ) => {
      const query = parseSearchString(payload.location.search);
      return isQueryParamsEquals(state, query) ? state : query;
    },
  },
});

export const { reducer: queryParamsReducer } = queryParamsSlice;

export const actions = {
  queryParamChanged,
};
