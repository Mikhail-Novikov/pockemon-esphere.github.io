import { isEmpty } from '@shared/lib/assist';

type StringifyPrimitiveItem = string | number | undefined | null | void;
type StringifyObjectItem = {
  /** Элемент склейки */
  value?: StringifyPrimitiveItem;
  /** Префикс элемента */
  prefix?: string | number;
  /** Постфикс элемента */
  postfix?: string | number;
  /** Разделитель для склейки префикса, элемента и постфикса */
  separator?: string;
  /** Условие отображения элемента и его составных частей */
  when?: boolean;
  /** Функция преобразования значения элемента */
  transform?: (value: StringifyPrimitiveItem) => string | number;
};

export type StringifyItem = StringifyPrimitiveItem | StringifyObjectItem;

export function stringify(item: StringifyItem): string;
export function stringify(items: StringifyItem[], separator?: string): string;

/**
 * Склейка значений в строку с дополнительной обработкой
 * @param items элементы для склейки
 * @param separator общий разделитель(по умолчанию - пробел, для каждого элемента можно добавить свой разделитель)
 * @returns строка
 */
export function stringify(
  items: StringifyItem | StringifyItem[],
  separator = ' ',
): string {
  const normalized = (Array.isArray(items) ? items : [items]).map<
    StringifyObjectItem
  >((item) => (item instanceof Object ? item : { value: item }));

  return normalized
    .filter(({ when }) => when !== false)
    .filter((item) => !isEmpty(item.value))
    .map(
      ({
        value,
        postfix,
        prefix,
        separator: itemSeparator = separator,
        transform,
      }) => {
        const transformedValue = transform?.(value) ?? value;

        return [
          isEmpty(prefix) ? '' : prefix,
          transformedValue,
          isEmpty(postfix) ? '' : postfix,
        ]
          .filter(Boolean)
          .join(itemSeparator);
      },
    )
    .join(separator);
}

/**
 * Заменить пробелы на nbsp
 * @param str строка
 * @returns результат
 */
export const noWrap = (str: string): string => str.replace(/\s+/g, '\u00a0');

/**
 * Создает функцию с префиксом для строки
 * @param prefix префикс
 * @param delimiter разделитель
 * @returns результат
 */
export const createPrefix = (prefix: string, delimiter = '/') => (
  str: string,
): string => `${prefix}${delimiter}${str}`;
