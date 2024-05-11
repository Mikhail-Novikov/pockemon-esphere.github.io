/** Конфигурация приложения */
export const globalConfig = {
  defaultDelay: 2000,
  routes: {
    home: () => '/',
    pokemons: () => '/pokemons',
    compare: () => '/compare',
  },
  baseUrl: 'https://pokeapi.co/api/v2/pokemon-form/',
  environment: process.env.NODE_ENV,
} as const;
