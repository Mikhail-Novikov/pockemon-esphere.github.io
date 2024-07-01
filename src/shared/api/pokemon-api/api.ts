import { createHttpClient, errorHandler } from '@shared/lib/request';

import { globalConfig } from '@shared/config';
import { DEFAULT_POKEMONS } from '@shared/constants';
import type { Pokemon, PokemonsApi } from './types';

const request = createHttpClient({
  serviceName: globalConfig.baseUrl,
  apiVersion: '',
  errorHandler,
});

/**
 * ### Метод для получения списка покемонов
 * @param {number} [size] - Выгрузка кол-ва покемонов на странице.
 * @returns {Promise<PokemonsApiFullResponse>} Список покемонов
 */
const getPokemonsList = async ({
  size = DEFAULT_POKEMONS.pokemonsLimit,
  offset = 0,
}: {
  size?: number;
  offset?: number;
}): Promise<PokemonsApi> => {
  const { data: response } = await request.get<PokemonsApi>({
    url: `?limit=${size}&offset=${offset}`,
  });
  return response;
};

/**
 * ### Метод для получения подробной информации о покемоне по имени
 *
 * @param {string} PokemonName - имя покемона
 * @returns {Promise<Pokemon>} Данные о покемоне подробно
 */
export const getPokemonByName = async (
  PokemonName: string,
): Promise<Pokemon> => {
  const { data } = await request.get<Pokemon>({
    url: `${PokemonName}`,
  });
  return data;
};

export const pokemonApi = {
  getPokemonsList,
  getPokemonByName,
};
