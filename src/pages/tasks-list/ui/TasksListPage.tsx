import React from 'react';
import * as L from 'korus-ui';

import { useGate } from '@shared/lib/store-gate';
import { loaderModel } from '@shared/lib/store-loader';

import { taskModel, TaskRow, TaskTableHeader } from '@entities/task';

import { ToggleTask } from '@features/toggle-task';

import { pageGate } from '../model';

export const TasksListPage: React.FC = () => {
  useGate(pageGate);

  const isLoading = loaderModel.selectors.useLoader(
    taskModel.config.loaders.loadTasks,
  );

  const tasks = taskModel.selectors.useTasks();

  return (
    <L.Loader isLoading={isLoading}>
      <L.H1>TasksList page!!</L.H1>

      <L.Div _table>
        <L.Table>
          <TaskTableHeader />
          <L.TBody>
            {tasks.map((task) => (
              <TaskRow task={task} key={task.id}>
                <ToggleTask withStatus taskId={task.id} />
              </TaskRow>
            ))}
          </L.TBody>
        </L.Table>
      </L.Div>
    </L.Loader>
  );
};
