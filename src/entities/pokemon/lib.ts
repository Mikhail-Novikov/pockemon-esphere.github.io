import { Task } from '@shared/api';

export const getTaskStatus = (data: Task): string =>
  data.completed ? 'CLOSED' : 'OPENED';
