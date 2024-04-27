import React from 'react';
import { Route, Switch } from 'react-router';

import { globalConfig } from '@shared/config';

import { MainWidget } from '@widgets/main';

import { AboutPage, HomePage, TasksListPage } from '@pages';

/**
 * Компонент с роутами приложения
 *
 * @returns {JSX.Element} Компонент с роутами приложения
 */
export const AppRoutes: React.FC = () => (
  <MainWidget>
    <Switch>
      <Route exact path={globalConfig.routes.home()} component={HomePage} />
      <Route exact path={globalConfig.routes.about()} component={AboutPage} />
      <Route
        exact
        path={globalConfig.routes.tasks()}
        component={TasksListPage}
      />
    </Switch>
  </MainWidget>
);
