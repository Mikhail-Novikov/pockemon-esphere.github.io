import React from 'react';
import * as L from 'korus-ui';

import { Pokemon } from '@shared/api/pokemon-api';

type PokemonCardProps = {
  pokemon: Pokemon;
  isLoading?: boolean;
};

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isLoading,
  children,
}) => {
  const { id, userId, title } = pokemon;
  return (
    <L.Loader isLoading={isLoading}>
      <L.Div>
        <L.P>id - {id}</L.P>
        <L.P>userId - {userId}</L.P>
        <L.P>title - {title}</L.P>
        {children}
      </L.Div>
    </L.Loader>
  );
};
