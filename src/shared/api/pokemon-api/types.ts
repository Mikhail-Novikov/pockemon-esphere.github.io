export type Pokemon = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

export type PokemonsApiResponse = {
  abilities: string;
  name: string;
  url: string;
};
