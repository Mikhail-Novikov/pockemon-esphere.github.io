/** Конфигурация приложения */
export const globalConfig = {
  defaultDelay: 2000,
  routes: {
    home: () => '/',
    tasks: () => '/tasks',
    about: () => '/about',
  },
  environment: process.env.NODE_ENV,
} as const;
