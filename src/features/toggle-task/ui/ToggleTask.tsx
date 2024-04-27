import React from 'react';
import * as L from 'korus-ui';

import { useActions } from '@shared/lib/use-it';

import { taskModel, taskLib } from '@entities/task';

export type ToggleTaskProps = {
  taskId: number;
  withStatus?: boolean;
};

export const ToggleTask: React.FC<ToggleTaskProps> = ({
  taskId,
  withStatus = true,
}: ToggleTaskProps) => {
  const { toggleTask } = useActions(taskModel.actions);
  const task = taskModel.selectors.useTask(taskId);

  if (!task) {
    return null;
  }

  const status = taskLib.getTaskStatus(task);

  return (
    <L.CheckBox value={task.completed} onChange={() => toggleTask(taskId)}>
      {withStatus && status}
    </L.CheckBox>
  );
};
