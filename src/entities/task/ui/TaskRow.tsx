import React from 'react';
import * as L from 'korus-ui';

import { Task } from '@shared/api';

type TaskRowProps = {
  task: Task;
};

export const TaskRow: React.FC<TaskRowProps> = ({ task, children }) => {
  const { id, userId, title } = task;

  return (
    <L.Tr>
      <L.Td>{children}</L.Td>
      <L.Td>{id}</L.Td>
      <L.Td>{userId}</L.Td>
      <L.Td>{title}</L.Td>
    </L.Tr>
  );
};
