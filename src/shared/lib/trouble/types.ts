/** действие для обработки ошибки */
export type TroubleAction = (error: Error) => unknown;

/** функция для сопоставления ошибки и действия */
export type TroubleMatcher = (error: Error) => boolean;

/** Действия разделенные по типам */
export type TroubleSplittedActions = {
  matchedActions: TroubleAction[];
  otherwiseActions: TroubleAction[];
  alwaysActions: TroubleAction[];
};

/** Trouble - обработчик ошибок */
export type Trouble = {
  /** Зарегистрировать действие, которое будет выполняться, если Matcher обнаружит ошибку */
  on: (matcher: TroubleMatcher, action: TroubleAction) => Trouble;

  /** Зарегистрировать действие, которое будет выполняться только в том случае, если никакое другое действие не выполнится */
  otherwise: (action: TroubleAction) => Trouble;

  /** Зарегистрировать действие, которое будет выполняться всегда и после всех остальных действий. Работает как finally. */
  always: (action: TroubleAction) => Trouble;

  /** Очистить все зарегистрированные действия */
  clear: () => Trouble;

  /** Получить разделенные по типам действия для ошибки Error */
  getSplittedActions(error: Error): TroubleSplittedActions;

  /** Получить все действия для ошибки Error */
  getActions(error: Error): TroubleAction[];
};
