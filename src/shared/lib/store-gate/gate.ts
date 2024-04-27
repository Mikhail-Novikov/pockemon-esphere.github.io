import { GateCreateParams, Gate, ModelStoreState } from './types';
import { actions as gateActions, selectors as gateSelectors } from './model';
import { addGate } from './gate-monitor';

/**
 * Создать Gate
 *
 * @param {GateCreateParams<T>} gateCreateParams - входные параметры
 *
 * @returns {Gate<T>} гейт
 */
export function createGate<T = void>(
  gateCreateParams: GateCreateParams<T>,
): Gate<T> {
  const { id, defaultState = null } = gateCreateParams;

  addGate({ id, defaultState });

  const actions = {
    opened: gateActions.createEventAction(id, 'opened'),
    closed: gateActions.createEventAction(id, 'closed'),
    stateChanged: gateActions.createEventAction(id, 'changed'),
  };

  const selectors = {
    status: (state: unknown) =>
      gateSelectors.status(state as ModelStoreState, { id }),
    state: (state: unknown): T =>
      gateSelectors.state(state as ModelStoreState, { id }) as T,
  };

  return { id, actions, selectors };
}
