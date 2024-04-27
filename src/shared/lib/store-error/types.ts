import { Trouble } from '@shared/lib/trouble';

/** стратегия для необработанных ошибок */
export enum UnhandledErrorsStrategy {
  /** применить дефолтный обработчик */
  UseDefault = 'UseDefault',
  /** пробросить дальше */
  Throw = 'Throw',
}

export type ErrorHandlerParams = {
  /** trouble */
  trouble: Trouble;
  /** стратегия для необработанных ошибок */
  unhandledErrorsStrategy: UnhandledErrorsStrategy;
};
