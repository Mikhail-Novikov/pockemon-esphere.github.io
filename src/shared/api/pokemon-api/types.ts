export type Pokemon = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

export type PokemonsApiResponse = {
  name: string;
  url: string;
};
