import { createHttpClient, errorHandler } from '@shared/lib/request';

import { globalConfig } from '@shared/config';
import type { Pokemon, PokemonsApiResponse } from './types';

const request = createHttpClient({
  serviceName: globalConfig.baseUrl,
  apiVersion: '',
  errorHandler,
});

const getPokemonInfo = async (name: string) => {
  const response = await fetch(`${globalConfig.baseUrl}${name}`);
  const data = await response.json();

  return data.forms.front_default;
};

const getPokemonsList = async (): Promise<PokemonsApiResponse[]> => {
  const {
    data: { results },
  } = await request.get<{ results: PokemonsApiResponse[] }>({ url: '/' });
  return results;
};

export const getPokemonById = async (PokemonId: number): Promise<Pokemon> => {
  const { data } = await request.get<Pokemon>({ url: `/${PokemonId}` });
  return data;
};

export const pokemonApi = {
  getPokemonInfo,
  getPokemonsList,
  getPokemonById,
};
