import { Task } from '@shared/api/todo-api';

export const getTaskStatus = (data: Task): string =>
  data.completed ? 'CLOSED' : 'OPENED';
