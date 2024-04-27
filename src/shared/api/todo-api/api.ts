import { createHttpClient, errorHandler } from '@shared/lib/request';

import type { Task } from './types';

const request = createHttpClient({
  serviceName: 'https://jsonplaceholder.typicode.com/todos',
  apiVersion: '',
  errorHandler,
});

const getTasksList = async (): Promise<Task[]> => {
  const { data } = await request.get<Task[]>({ url: '/' });
  return data;
};

export const getTaskById = async (taskId: number): Promise<Task> => {
  const { data } = await request.get<Task>({ url: `/${taskId}` });
  return data;
};

export const todoApi = {
  getTasksList,
  getTaskById,
};
