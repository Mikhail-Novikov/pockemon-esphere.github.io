import { FilterMeta } from './types';

const filterMetaMap: Record<string, FilterMeta> = {};

export const addFilterMeta = (id: string, meta: FilterMeta): void => {
  filterMetaMap[id] = meta;
};

export const findFilterMeta = (id: string): FilterMeta => filterMetaMap[id];

export const removeFilterMeta = (id: string): void => {
  delete filterMetaMap[id];
};
