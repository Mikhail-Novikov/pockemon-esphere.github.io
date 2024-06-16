/** Конфигурация приложения */
export const globalConfig = {
  defaultDelay: 2000,
  routes: {
    home: () => '/',
    pokemons: () => '/pokemons',
    pokemon: () => '/pokemon/:name',
    compare: () => '/compare',
  },
  baseUrl: 'https://pokeapi.co/api/v2/pokemon',
  environment: process.env.NODE_ENV,
} as const;
