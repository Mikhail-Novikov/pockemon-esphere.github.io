import React, { useEffect, useState } from 'react';
import * as L from 'korus-ui';

import { PokemonsApiResponse } from '@shared/api/pokemon-api';

type PokemonsProps = {
  pokemons: PokemonsApiResponse;
};

export const Pokemons: React.FC<PokemonsProps> = ({ pokemons }) => {
  const { name, url } = pokemons;
  const [pokemon, setPokemon] = useState<any>();
  const [pokemonAbilites, setPokemonAbilities] = useState<any>();

  const fetchAbilities = async (
    pokemonData: PokemonsApiResponse,
  ): Promise<void> => {
    const { ability } = (pokemonData.abilities[0] as unknown) as {
      ability: { url: string };
    };
    const abilitiesData = await fetch(ability.url).then((res) => res.json());
    setPokemonAbilities(abilitiesData.effect_entries[0].effect);
  };

  const fetchUrl = async () => {
    try {
      const data = await fetch(url).then((res) => res.json());
      fetchAbilities(data);

      setPokemon(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, [url]);

  return (
    <L.Div _colXxl3 _colLg4 _colMd6 _marginBottom24>
      <L.Div _box _documentBox _inner24 _marginBottomNone _height100>
        <L.Div _flexRow _alignItemsCenter>
          <L.Div _flexRow>
            <L.Div _subtitle>{pokemon?.id}</L.Div>
            <L.Img
              src={pokemon?.sprites?.front_default}
              alt={name}
              _marginRight4
            />
          </L.Div>

          <L.Div _paddingLeft16>
            <L.H2>
              <L.Tooltip title={pokemonAbilites}>{name}</L.Tooltip>
            </L.H2>
            <L.Div _subtitle>{pokemon?.types[0].type.name}</L.Div>
          </L.Div>
        </L.Div>
      </L.Div>
    </L.Div>
  );
};
