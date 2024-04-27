export enum ServerDate {
  Date = 'yyyy-MM-dd',
}

export enum UiDate {
  Date = 'dd.MM.yyyy',
  WideDate = 'd MMMM yyyy',
  DateTime = 'dd.MM.yyyy HH:mm',
  Time = 'HH:mm',
}

export type ConvertDateFromDateOptions = {
  /** Минимальное значение даты */
  min?: Date;
  /** Максимальное значение даты */
  max?: Date;
  /** Формат в который будет выполнена конвертация */
  to: UiDate | ServerDate;
};

export type ConvertDateFromStringOptions = ConvertDateFromDateOptions & {
  /** Формат из которого будет выполнена конвертация */
  from: UiDate | ServerDate;
};

export type ConvertDateOptions<T extends string | Date> = T extends Date
  ? ConvertDateFromDateOptions
  : ConvertDateFromStringOptions;
