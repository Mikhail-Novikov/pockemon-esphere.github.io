import React, { useEffect, useState } from 'react';
import * as L from 'korus-ui';
import { useHistory } from 'react-router-dom';

import { Pokemon, PokemonsApiResponse } from '@shared/api/pokemon-api';
import { ToggleSelect } from '@features/select-compare';
import { useActions } from '@shared/lib/use-it';
import { pokemonModel } from '@entities/pokemon';

type PokemonsProps = {
  pokemons: PokemonsApiResponse;
};

export const Pokemons: React.FC<PokemonsProps> = ({ pokemons }) => {
  const history = useHistory();
  const item = pokemons.name;
  const { name, url } = pokemons;
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonAbilites, setPokemonAbilities] = useState<string>();

  const { toggleSelect } = useActions(pokemonModel.actions);

  const selectedPokemos = pokemonModel.selectors.getSelectedPokemons();
  const isSelected = selectedPokemos.includes(pokemon?.name);

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

  const handleClickBox = (): void => {
    if (pokemon) {
      history.push(`/pokemon/${item}`);
    }
  };

  const handleClick = () => {
    toggleSelect(pokemon?.name);
  };

  return (
    <L.Div _colXxl3 _colLg4 _colMd6 _marginBottom24>
      <L.Div
        _box
        _documentBox
        _inner24
        _marginBottomNone
        _height100
        onClick={handleClickBox}
      >
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
            <ToggleSelect
              pokemonId={pokemon?.id}
              handleClick={handleClick}
              checked={isSelected}
            />
          </L.Div>
        </L.Div>
      </L.Div>
    </L.Div>
  );
};
