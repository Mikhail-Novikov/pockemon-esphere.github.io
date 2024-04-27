import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { put } from 'redux-saga/effects';
import { Leda, UnderscoreClasses } from 'korus-ui';

import { defaultTrouble, errorModel } from '@shared/lib/store-error';

import '@styles/main.css';

import { initAppModel } from '@processes/init';

import configureStore from '../store';

import { AppRoutes } from './AppRoutes';

/** Обработка ошибок по-умолчанию */
defaultTrouble.otherwise(function* act(error: Error) {
  yield put(errorModel.actions.setError({ code: error?.name }));
});

/** store приложения */
const { store, history } = configureStore();

/** инициализация */
store.dispatch(initAppModel.actions.initApp());

/**
 * Приложение
 *
 * @returns {React.ReactElement} компонент
 */
export const App: React.FC = () => (
  <Provider store={store}>
    <Leda underscoreClassesTransform={UnderscoreClasses.CamelCaseTransform}>
      <Router history={history}>
        <AppRoutes />
      </Router>
    </Leda>
  </Provider>
);
