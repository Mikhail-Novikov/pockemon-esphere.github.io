import React from 'react';
import * as L from 'korus-ui';

import { Pokemon } from '@shared/api/pokemon-api';

type PokemonCardProps = {
  pokemon: Pokemon;
  isLoading?: boolean;
};

/**
 * Компонент карты покемона с подробностями
 *
 * @param {PokemonCardProps} pokemon - имя, рост, вес, спрайты, типы, статистика и способности
 * @returns {ReactElement} Pokemon card
 */
export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
}: PokemonCardProps): JSX.Element => {
  const { name, height, weight, sprites, types, stats, abilities } = pokemon;
  const typeName = types?.map(({ type }) => type.name).join(' ');
  const fon = typeName?.toString();

  return (
    <L.Div _cardWrapper _action _widthFitContent _flexRow>
      <L.Div _cardImage className={fon}>
        <L.Img src={sprites?.front_default} alt="" />
      </L.Div>
      <L.Div _cardContent>
        <L.H3 _marginBottom16 _txtLarger _txtFirstLetter>
          {name}
        </L.H3>
        <L.Div _marginBottom16 _txtLarger>
          {typeName}
        </L.Div>
        <L.Dl _list _w35>
          <L.Dt>height:&nbsp;</L.Dt>
          <L.Dd>{height}</L.Dd>
          <L.Dt>weight:&nbsp;</L.Dt>
          <L.Dd>{weight}</L.Dd>
        </L.Dl>
        <L.Dl _list _w35>
          {stats?.map((stat) => (
            <>
              <L.Dt key={stat.stat.name}>{stat.stat.name}</L.Dt>
              <L.Dd key={stat.base_stat}>{stat.base_stat}</L.Dd>
            </>
          ))}
        </L.Dl>
        <L.Dl _list _w35>
          <L.Dt>Abilities:</L.Dt>
          {abilities?.map((ability) => (
            <L.Dd key={ability.ability.name}>{ability.ability.name}</L.Dd>
          ))}
        </L.Dl>
      </L.Div>
    </L.Div>
  );
};
