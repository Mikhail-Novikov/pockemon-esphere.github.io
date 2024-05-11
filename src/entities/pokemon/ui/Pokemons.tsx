import React, { useEffect, useState } from 'react';
import * as L from 'korus-ui';

import { PokemonsApiResponse } from '@shared/api/pokemon-api';

type PokemonsProps = {
  pokemons: PokemonsApiResponse;
};

export const Pokemons: React.FC<PokemonsProps> = ({ pokemons }) => {
  const { name, url } = pokemons;
  const [pokemon, setPokemon] = useState<any>();

  const fetchUrl = async () => {
    try {
      const data = await fetch(url).then((res) => res.json());

      setPokemon(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, [url]);

  console.log('pokemon', pokemon);

  return (
    <L.Div _colXxl3 _colLg4 _colMd6 _marginBottom24>
      <L.Div _box _documentBox _inner24 _marginBottomNone _height100>
        <L.Div _flexRow _alignItemsCenter>
          <L.Div _flexRow>
            <L.Div _subtitle>{pokemon?.id}</L.Div>
            <L.Img
              src={pokemon?.sprites.front_default}
              alt={name}
              _marginRight4
            />
          </L.Div>

          <L.Div _paddingLeft16>
            <L.H2>{name}</L.H2>
            <L.Div _subtitle>{pokemon?.types[0].type.name}</L.Div>
          </L.Div>
        </L.Div>
      </L.Div>
    </L.Div>
  );
};
