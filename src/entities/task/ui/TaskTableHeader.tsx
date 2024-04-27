import React from 'react';
import * as L from 'korus-ui';

/** @returns {React.FC} Хэдер таблицы тасков */
export const TaskTableHeader: React.FC = () => (
  <>
    <L.ColGroup>
      <L.Col _width-25 />
      <L.Col _width-25 />
      <L.Col _width-25 />
      <L.Col _width-25 />
    </L.ColGroup>
    <L.THead>
      <L.Tr>
        <L.Th _table-header _txt-bold>
          Status
        </L.Th>
        <L.Th _table-header _txt-bold>
          Id
        </L.Th>
        <L.Th _table-header _txt-bold>
          UserId
        </L.Th>
        <L.Th _table-header _txt-bold>
          Title
        </L.Th>
      </L.Tr>
    </L.THead>
  </>
);
