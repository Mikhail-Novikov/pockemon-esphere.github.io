import { createHttpClient, errorHandler } from '@shared/lib/request';

import { globalConfig } from '@shared/config';
import { DEFAULT_POKEMONS } from '@shared/constants';
import type { Pokemon, PokemonsApiResponse } from './types';

const request = createHttpClient({
  serviceName: globalConfig.baseUrl,
  apiVersion: '',
  errorHandler,
});

const getPokemonInfo = async (name: string): Promise<string> => {
  const response = await fetch(`${globalConfig.baseUrl}${name}`);
  const data = await response.json();

  return data.forms.front_default;
};
/**
 * ### Метод для получения списка покемонов
 *
 * @param {number} [size=DEFAULT_POKEMONS.pokemonsLimit] - Выгрузка кол-ва покемонов на странице.
 * @param {number} [page=0] - Номер страницы.
 * @returns {Promise<PokemonsApiFullResponse>} Список покемонов
 */
const getPokemonsList = async ({
  size = DEFAULT_POKEMONS.pokemonsLimit,
  page = 0,
}: {
  size?: number;
  page?: number;
}): Promise<PokemonsApiResponse[]> => {
  const { data: response } = await request.get<PokemonsApiResponse[]>({
    url: `?limit=${size}&offset=${page}`,
  });
  return response;
};

export const getPokemonByName = async (
  PokemonName: string,
): Promise<Pokemon> => {
  const { data } = await request.get<Pokemon>({
    url: `${PokemonName}`,
  });
  return data;
};

export const pokemonApi = {
  getPokemonInfo,
  getPokemonsList,
  getPokemonByName,
};
