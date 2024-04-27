import { format, parseISO, parse, isAfter, isBefore } from 'date-fns';
import ru from 'date-fns/locale/ru';

import { ConvertDateOptions, ServerDate, UiDate } from './types';

const isDate = (value: Date | string): value is Date => value instanceof Date;

/**
 * Конвертирует дату из одного формата в другой
 *
 * @param date дата
 * @param options опции
 *
 * @returns дата
 */
export function convertDate<T extends string | Date>(
  date: T,
  options: ConvertDateOptions<T>,
): string {
  const { from, to, max, min } =
    'from' in options ? options : { ...options, from: undefined };

  let parsedDate = isDate(date)
    ? date
    : parse(date, from, new Date(), { locale: ru });

  const maxDate = max ?? new Date(9999, 11, 31);

  if (min && isBefore(parsedDate, min)) {
    parsedDate = min;
  }
  if (isAfter(parsedDate, maxDate)) {
    parsedDate = maxDate;
  }

  return format(parsedDate, to, { locale: ru });
}

/**
 * Конвертирует дату из ISO в UI формат
 *
 * @param isoDate дата
 * @param uiFormat ui формат
 * @returns дата
 */
export const convertDateFromIsoToUi = (
  isoDate: string,
  uiFormat: UiDate,
): string => format(parseISO(isoDate), uiFormat, { locale: ru });

/**
 * Получить текущую дату
 *
 * @param dateFormat формат
 * @returns дата
 */
export const currentDate = (dateFormat: UiDate | ServerDate): string =>
  format(new Date(), dateFormat, { locale: ru });
