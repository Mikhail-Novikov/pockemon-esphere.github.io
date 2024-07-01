import React, { useEffect } from 'react';
import * as L from 'korus-ui';

import { useGate } from '@shared/lib/store-gate';
import { loaderModel } from '@shared/lib/store-loader';

import { PokemonCard, pokemonModel } from '@entities/pokemon';

import { useParams } from 'react-router';
import { Pokemon } from '@shared/api/pokemon-api';
import { getPokemonByName } from '@shared/api/pokemon-api/api';
import { pageGate } from '../model';

/**
 * Cтраница с данными о покемонах.
 *
 * @returns {JSX.Element} компонент страницы
 */
export const PokemonItemPage: React.FC = (): JSX.Element => {
  useGate(pageGate);

  const isLoading = loaderModel.selectors.useLoader(
    pokemonModel.config.loaders.loadPokemons,
  );

  const params = useParams<{ name: string }>();
  const [pokemon, setPokemon] = React.useState<Pokemon>({} as Pokemon);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);

    getPokemonByName(params.name)
      .then((data: React.SetStateAction<Pokemon>) => {
        setPokemon(data);
      })
      .finally(() => setLoading(false));
  }, [params.name]);

  return (
    <L.Loader isLoading={loading}>
      <PokemonCard isLoading={isLoading} pokemon={pokemon} />
    </L.Loader>
  );
};
