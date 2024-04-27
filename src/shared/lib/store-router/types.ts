import { RouterState } from 'redux-first-history';

export type QueryParams = Record<string, string>;

export type ModelState = {
  router: RouterState;
  query: QueryParams;
};
