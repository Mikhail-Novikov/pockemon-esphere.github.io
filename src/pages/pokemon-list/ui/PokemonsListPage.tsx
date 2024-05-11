import React from 'react';
import * as L from 'korus-ui';

import { useGate } from '@shared/lib/store-gate';
import { loaderModel } from '@shared/lib/store-loader';

import { pokemonModel, Pokemons } from '@entities/pokemon';

import { selectors } from '@entities/pokemon/model/selectors';

import { pageGate } from '../model';

export const PokemonsListPage: React.FC = () => {
  useGate(pageGate);

  const isLoading = loaderModel.selectors.useLoader(
    pokemonModel.config.loaders.loadPokemons,
  );

  const pokemons = selectors.useApiPokemons();

  console.log('pokemons api page', pokemons);

  return (
    <L.Loader isLoading={isLoading}>
      <L.H1 _marginBottom16 _paddingTop16>
        Покемоны {pokemons?.length} шт.
      </L.H1>

      <L.Div _row>
        {pokemons?.map((pokemon, idx) => (
          <Pokemons pokemons={pokemon} key={idx.toString()} />
        ))}
      </L.Div>
    </L.Loader>
  );
};
