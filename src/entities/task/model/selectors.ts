import { createSelector } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Task } from '@shared/api/todo-api';
import {
  PartialState,
  createHookSelector,
  createModelFieldSelector,
  declareModelStateType,
} from '@shared/lib/store';

import { config } from '../config';
import { ModelState } from './ducks';

type State = PartialState<typeof config.modelName, ModelState>;

const fieldSelector = createModelFieldSelector({
  stateType: declareModelStateType<ModelState>(),
  name: config.modelName,
});

/** Селектор. Список задач */
const tasksSelector = fieldSelector('tasks');

/** Создает селектор. Задача */
const makeTaskSelector = () =>
  createSelector(
    tasksSelector,
    (_: unknown, taskId: number) => taskId,
    (tasks, taskId) => tasks.find(({ id }) => id === taskId),
  );

/** Создает селектор. Фильрованный список задач */
const makeFilteredTasksSelector = () =>
  createSelector(
    tasksSelector,
    (_: unknown, isCompleted: boolean) => isCompleted,
    (tasks, isCompleted) =>
      tasks.filter(({ completed }) => completed === isCompleted),
  );

export const selectors = {
  useTasks: createHookSelector(tasksSelector),
  useTask: (taskId: number): Task => {
    const taskSelector = useMemo(makeTaskSelector, []);
    return useSelector((state: State) => taskSelector(state, taskId));
  },
  useFilteredTasks: (isCompleted: boolean): Task[] => {
    const filteredTasksSelector = useMemo(makeFilteredTasksSelector, []);
    return useSelector((state: State) =>
      filteredTasksSelector(state, isCompleted),
    );
  },
};
