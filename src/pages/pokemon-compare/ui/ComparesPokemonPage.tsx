import React from 'react';
import * as L from 'korus-ui';

import { PokemonTableHeader, PokemonTableRow } from '@entities/compare/ui';
import { pokemonModel } from '@entities/pokemon';

/**
 * Страница сравнения покемонов
 *
 * @returns {JSX.Element} компонент страницы
 */
export const ComparesPokemonPage: React.FC = (): JSX.Element => {
  const selectedPkemons = pokemonModel.selectors.getSelectedPokemons();

  return (
    <>
      <L.H1 _marginBottom16 _paddingTop16>
        Сравнение покемонов
      </L.H1>

      <L.Div _table>
        <L.Table>
          <PokemonTableHeader />
          <L.TBody>
            {selectedPkemons.map((pokemon) => (
              <PokemonTableRow pokemonNames={pokemon} key={pokemon} />
            ))}
          </L.TBody>
        </L.Table>
      </L.Div>
    </>
  );
};
