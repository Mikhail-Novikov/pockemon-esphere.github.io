import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Task } from '@shared/api';
import { setStoreField } from '@shared/lib/store';

import { config } from '../config';

const initialState = {
  tasks: [] as Task[],
};

export type ModelState = typeof initialState;

/** Cлайс модели */
const taskSlice = createSlice({
  name: config.modelName,
  initialState,
  reducers: {
    setTasks: setStoreField('tasks'),
    toggleTask(state, { payload: taskId }: PayloadAction<number>) {
      const task = state.tasks.find(({ id }) => id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
    reset: () => initialState,
  },
});

export const { reducer, actions } = taskSlice;
