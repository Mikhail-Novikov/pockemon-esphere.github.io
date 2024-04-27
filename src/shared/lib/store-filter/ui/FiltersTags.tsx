import React from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { useActions } from '@shared/lib/use-it';
import { stringify } from '@shared/lib/strings';

import { AnyValue, Filter } from '../types';
import { actions } from '../model';

type FiltersTagsProps = {
  /** фильтры */
  filters: Filter<AnyValue>[];
};

/**
 * Получить текст для отображения в теге
 *
 * @param filterValue значение фильтра
 * @returns  результат
 */
function displayTagValue<T>(filterValue: T) {
  if (Array.isArray(filterValue)) {
    const [from, to] = filterValue;

    return stringify([
      {
        prefix: 'с',
        value: from,
      },
      {
        prefix: 'по',
        value: to,
      },
    ]);
  }

  return filterValue;
}

/**
 * Чипсы фильтров
 *
 * @returns компонент
 */
export const FiltersTags: React.FC<FiltersTagsProps> = ({ filters }) => {
  const { resetFilter } = useActions(actions);

  const isEmptyList = useSelector((state) =>
    filters.map(({ selectors: { isEmpty } }) => isEmpty(state)),
  );
  const appliedValueList = useSelector((state) =>
    filters.map(({ selectors: { appliedValue } }) => appliedValue(state)),
  );

  if (isEmptyList.every(Boolean)) {
    return null;
  }

  const tags = filters.map<L.TagsTypes.TagProps>(({ title, id }, index) => ({
    id,
    shouldRender: !isEmptyList[index],
    value: `${title}: ${displayTagValue(appliedValueList[index])}`,
    onIconClick: () => resetFilter(id),
  }));

  return (
    <L.Tags>
      {tags.map(({ id, value, ...rest }) => (
        <L.Tag key={id} {...rest}>
          {value}
        </L.Tag>
      ))}
    </L.Tags>
  );
};
