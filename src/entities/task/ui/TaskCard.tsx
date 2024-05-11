import React from 'react';
import * as L from 'korus-ui';

import { Task } from '@shared/api/todo-api';

type TaskCardProps = {
  task: Task;
  isLoading?: boolean;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isLoading,
  children,
}) => {
  const { id, userId, title } = task;
  return (
    <L.Loader isLoading={isLoading}>
      <L.Div>
        <L.P>id - {id}</L.P>
        <L.P>userId - {userId}</L.P>
        <L.P>title - {title}</L.P>
        {children}
      </L.Div>
    </L.Loader>
  );
};
