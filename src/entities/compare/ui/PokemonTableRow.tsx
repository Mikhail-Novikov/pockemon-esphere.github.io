import React, { useEffect } from 'react';
import * as L from 'korus-ui';
import { Pokemon } from '@shared/api/pokemon-api';
import { getPokemonByName } from '@shared/api/pokemon-api/api';

type CompareRowProps = {
  pokemonNames: string;
};

/**
 * Отображает строку в таблице покемонов с указанным именем.
 *
 * @param {string} pokemonNames - Имя покемона
 * @returns {ReactElement} строка с покемоном
 */
export const PokemonTableRow: React.FC<CompareRowProps> = ({
  pokemonNames,
}) => {
  const [pokemon, setPokemon] = React.useState<Pokemon>({} as Pokemon);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);

    getPokemonByName(pokemonNames)
      .then((data: React.SetStateAction<Pokemon>) => {
        setPokemon(data);
      })
      .finally(() => setLoading(false));
  }, [pokemonNames]);

  const { name, height, weight, sprites, types, stats, abilities } = pokemon;

  if (loading) {
    return (
      <L.Tr>
        <L.Td colSpan={12} _txtCenter>
          <L.Div
            _inner12
            _skeleton
            _dark
            _justifyContentCenter
            _alignItemsCenter
            _txtGray
          >
            Загрузка
          </L.Div>
        </L.Td>
      </L.Tr>
    );
  }
  return (
    <>
      <L.Tr>
        <L.Td>
          <L.Img src={sprites?.front_default} alt={name} />
        </L.Td>
        <L.Td>{name}</L.Td>
        <L.Td>{height}</L.Td>
        <L.Td>{weight}</L.Td>
        <L.Td>
          {types?.map(({ type }) => (
            <L.P>{type.name}</L.P>
          ))}
        </L.Td>

        {stats?.map(({ base_stat }) => (
          // eslint-disable-next-line camelcase
          <L.Td>{base_stat}</L.Td>
        ))}

        <L.Td>
          {abilities?.map(({ ability }) => (
            <L.P>{ability.name}</L.P>
          ))}
        </L.Td>
      </L.Tr>
    </>
  );
};
