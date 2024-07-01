import React from 'react';
import * as L from 'korus-ui';

import { useGate } from '@shared/lib/store-gate';
import { loaderModel } from '@shared/lib/store-loader';

import { pokemonModel } from '@entities/pokemon';

import { useActions } from '@shared/lib/use-it';
import { filterModel } from '@src/processes/filter';
import { PokemonsApiResponse } from '@shared/api/pokemon-api';
import { Pokemons } from '@entities/pokemon/ui/Pokemons';
import { DEFAULT_POKEMONS } from '@shared/constants';
import { pageGate } from '../model';

/**
 * страница со списком покемонов
 *
 * @returns {JSX.Element} компонент страницы
 */
export const PokemonsListPage: React.FC = (): JSX.Element => {
  useGate(pageGate);

  const isLoading = loaderModel.selectors.useLoader(
    pokemonModel.config.loaders.loadPokemons,
  );
  const pokemons = pokemonModel.selectors.getListPokemons();
  const count = pokemonModel.selectors.getCountPokemons();

  const { setPaging } = useActions(filterModel.actions);
  const paging = filterModel.selectors.getPaging();

  const pager = {
    pageSize: paging.size || DEFAULT_POKEMONS.pokemonsLimit,
    offset: paging.offset || 0,
    current: paging.current || 1,
    total: count,
  };

  /**
   * Обработчик нумерации страниц.
   *
   * @param {L.PaginationTypes.ChangeEvent} ev - значение номера страницы.
   * @returns {void}
   */
  const handlePaginationChange = (ev: L.PaginationTypes.ChangeEvent): void => {
    setPaging({
      ...paging,
      offset: ev.component.value * pager.pageSize - pager.pageSize,
      current: ev.component.value,
    });
  };

  /**
   * Обработчик размера страницы(10, 20, 50).
   *
   * @param {L.PaginationTypes.ChangeEvent} ev - значение размера страницы
   * @returns {void}
   */
  const handlePageSizeChange = (ev: L.PaginationTypes.ChangeEvent): void => {
    setPaging({
      ...paging,
      size: ev.component.value,
    });
  };

  return (
    <L.Loader isLoading={isLoading}>
      <L.H1 _marginBottom16 _paddingTop16>
        Покемоны {pokemons?.length} шт.
      </L.H1>

      <L.Div _row>
        {pokemons?.map((pokemon: PokemonsApiResponse, idx: number) => (
          <Pokemons pokemons={pokemon} key={idx.toString()} />
        ))}
      </L.Div>

      <L.Pagination
        totalItems={pager.total}
        currentPage={pager.current}
        pageSize={pager.pageSize}
        onChange={handlePaginationChange}
        pageSizeOptions={[5, 10, 20, 50]}
        onPageSizeChange={handlePageSizeChange}
      />
    </L.Loader>
  );
};
