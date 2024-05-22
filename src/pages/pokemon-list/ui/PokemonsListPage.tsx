import React from 'react';
import * as L from 'korus-ui';

import { useGate } from '@shared/lib/store-gate';
import { loaderModel } from '@shared/lib/store-loader';

import { pokemonModel, Pokemons } from '@entities/pokemon';

import { selectors } from '@entities/pokemon/model';
import { useActions } from '@shared/lib/use-it';
import { filterModel } from '@src/processes/filter';
import { PokemonsApiResponse } from '@shared/api/pokemon-api';
import { pageGate } from '../model';

export const PokemonsListPage: React.FC = () => {
  useGate(pageGate);

  const isLoading = loaderModel.selectors.useLoader(
    pokemonModel.config.loaders.loadPokemons,
  );

  const pokemons = selectors.useApiPokemons();
  const { results, count } = (pokemons as unknown) as {
    results: PokemonsApiResponse[];
    count: number;
  };
  const { setPaging } = useActions(filterModel.actions);
  const paging = filterModel.selectors.getPaging();

  const pager = {
    pageSize: paging.size || 10,
    page: paging.page || 1,
    total: count,
  };

  const handlePaginationChange = (ev: L.PaginationTypes.ChangeEvent): void => {
    setPaging({
      ...paging,
      page: ev.component.value,
    });
  };

  const handlePageSizeChange = (ev: L.PaginationTypes.ChangeEvent): void => {
    setPaging({
      ...paging,
      size: ev.component.value,
    });
  };

  return (
    <L.Loader isLoading={isLoading}>
      <L.H1 _marginBottom16 _paddingTop16>
        Покемоны {results?.length} шт.
      </L.H1>

      <L.Div _row>
        {results?.map((pokemon: PokemonsApiResponse, idx: number) => (
          <Pokemons pokemons={pokemon} key={idx.toString()} />
        ))}
      </L.Div>

      <L.Pagination
        totalItems={pager.total}
        currentPage={pager.page}
        pageSize={pager.pageSize}
        onChange={handlePaginationChange}
        pageSizeOptions={[5, 10, 20, 50]}
        onPageSizeChange={handlePageSizeChange}
      />
    </L.Loader>
  );
};
