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

/**
 * Создает селектор для получения задачи по id.
 *
 * Селектор принимает состояние модели и id задачи.
 * Он возвращает задачу с указанным id из списка задач,
 * сохраненных в состоянии модели.
 *
 * @return {(state: State, taskId: number) => Task | undefined} Селектор
 */
const makeTaskSelector = (): ((
  state: State,
  taskId: number,
) => Task | undefined) =>
  createSelector(
    // Селектор для списка задач
    tasksSelector,
    // Селектор для id задачи
    (_: unknown, taskId: number) => taskId,
    /**
     * Ищет задачу в списке задач по id.
     *
     * @param {Task[]} tasks - Список задач
     * @param {number} taskId - Id искомой задачи
     * @return {Task | undefined} Найденная задача или undefined
     */
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
  /**
   * возвращает конкретную задачу из состояния на основе идентификатора задачи.
   *
   * @param {number} taskId - The ID of the task to retrieve.
   * @return {Task} The task with the provided ID, or undefined if not found.
   */
  useTask: (taskId: number): Task => {
    // Создайте селектор для задачи на основе предоставленного идентификатора.
    const taskSelector = useMemo(makeTaskSelector, []);

    // Используйте селектор, чтобы извлечь задачу из состояния.
    return useSelector((state: State) =>
      /*
       * Передайте состояние и идентификатор задачи в селектор.
       * Селектор найдет задачу с указанным идентификатором в состоянии.
       */
      taskSelector(state, taskId),
    );
  },
  useFilteredTasks: (isCompleted: boolean): Task[] => {
    const filteredTasksSelector = useMemo(makeFilteredTasksSelector, []);
    return useSelector((state: State) =>
      filteredTasksSelector(state, isCompleted),
    );
  },
};
