import { TroubleAction, TroubleMatcher, Trouble } from './types';

/**
 * Создать экземпляр Trouble
 *
 * @returns экземпляр Trouble
 */
export const createTrouble = (): Trouble => {
  let actionsEntries: {
    matcher: TroubleMatcher;
    action: TroubleAction;
  }[] = [];
  let otherwiseActions: TroubleAction[] = [];
  let alwaysActions: TroubleAction[] = [];

  const trouble: Trouble = {
    on(matcher, action) {
      actionsEntries.push({ matcher, action });
      return trouble;
    },

    otherwise(action) {
      otherwiseActions.push(action);
      return trouble;
    },

    always(action) {
      alwaysActions.push(action);
      return trouble;
    },

    clear() {
      actionsEntries = [];
      otherwiseActions = [];
      alwaysActions = [];
      return trouble;
    },

    getSplittedActions(error) {
      const matchedActions = actionsEntries
        .filter(({ matcher }) => matcher(error))
        .map(({ action }) => action);

      return {
        matchedActions,
        otherwiseActions: matchedActions.length ? [] : otherwiseActions,
        alwaysActions,
      };
    },

    getActions(error) {
      const {
        matchedActions: ma,
        otherwiseActions: oa,
        alwaysActions: aa,
      } = trouble.getSplittedActions(error);

      return [...ma, ...oa, ...aa];
    },
  };

  return trouble;
};

/**
 * Комбинировать действия 2х Trouble
 *
 * @param parent - родительский Trouble
 * @param child - дочерний Trouble
 * @param error - ошибка
 *
 * @returns массив действия по ошибке
 */
export const combineTroubleActions = ({
  parent,
  child,
  error,
}: {
  parent: Trouble;
  child?: Trouble;
  error: Error;
}): TroubleAction[] => {
  const {
    matchedActions: parentMatchedActions,
    otherwiseActions: parentOtherwiseActions,
    alwaysActions: parentAlwaysActions,
  } = parent.getSplittedActions(error);

  const {
    matchedActions: childMatchedActions = [],
    otherwiseActions: childOtherwiseActions = [],
    alwaysActions: childAlwaysActions = [],
  } = child?.getSplittedActions(error) || {};

  const hasChildMatchedOrOtherwise =
    childMatchedActions.length || childOtherwiseActions.length;

  const matchedActions = hasChildMatchedOrOtherwise
    ? childMatchedActions
    : parentMatchedActions;

  const otherwiseActions = hasChildMatchedOrOtherwise
    ? childOtherwiseActions
    : parentOtherwiseActions;

  return [
    ...matchedActions,
    ...otherwiseActions,
    ...childAlwaysActions,
    ...parentAlwaysActions,
  ];
};
