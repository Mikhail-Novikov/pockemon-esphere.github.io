import { PokemonsApi } from '@shared/api/pokemon-api';

export type PokemonState = {
  pokemons: PokemonsApi;
  allPokemons: { name: string; url: string }[];
  listSelected: string[];
};
