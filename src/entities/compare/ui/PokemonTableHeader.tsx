import React from 'react';
import * as L from 'korus-ui';

/** @returns {React.FC} Хэдер таблицы тасков */
export const PokemonTableHeader: React.FC = () => (
  <>
    <L.ColGroup>
      <L.Col style={{ width: '120px' }} />
      <L.Col style={{ width: '100px' }} />
      <L.Col style={{ width: '100px' }} />
      <L.Col style={{ width: '100px' }} />
      <L.Col style={{ width: '100px' }} />
      <L.Col style={{ width: '60px' }} />
      <L.Col style={{ width: '60px' }} />
      <L.Col style={{ width: '70px' }} />
      <L.Col style={{ width: '90px' }} />
      <L.Col style={{ width: '110px' }} />
      <L.Col style={{ width: '90px' }} />
      <L.Col style={{ width: '100px' }} />
    </L.ColGroup>
    <L.Tr>
      <L.Th _alignTop rowSpan="2">
        Вид
      </L.Th>
      <L.Th _alignTop rowSpan="2">
        Имя
      </L.Th>
      <L.Th _alignTop rowSpan="2">
        Рост
      </L.Th>
      <L.Th _alignTop rowSpan="2">
        Вес
      </L.Th>
      <L.Th _alignTop rowSpan="2">
        Тип
      </L.Th>
      <L.Th _alignTop colSpan="6">
        Статистика
      </L.Th>
      <L.Th _alignTop rowSpan="2">
        Способности
      </L.Th>
    </L.Tr>
    <L.Tr>
      <L.Th>HP</L.Th>
      <L.Th>Atack</L.Th>
      <L.Th>Defense</L.Th>
      <L.Th>Special-Atack</L.Th>
      <L.Th>Special-Defense</L.Th>
      <L.Th>Speed</L.Th>
    </L.Tr>
  </>
);
