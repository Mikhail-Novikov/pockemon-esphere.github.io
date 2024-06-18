import React from 'react';
import * as L from 'korus-ui';

export type TogglePokemonProps = {
  pokemonId: number;
  handleClick?: () => void;
  checked?: boolean;
};

/**
 * Чекбокс - перключатель с всплывающей подсказкой, для выбора сравнения покемонов
 *
 * @param {number} pokemon - Уникальный идентификатор покемона
 * @returns {ReactElement} Компонент checkbox
 */
export const ToggleSelect: React.FC<TogglePokemonProps> = ({
  handleClick,
  checked,
}: TogglePokemonProps): React.ReactElement => (
  <L.Div _wrapperCheckbox onClick={(ev) => ev.stopPropagation()}>
    <L.Tooltip title={!checked ? 'Выбрать для сравнения' : 'Выбрано'}>
      <L.CheckBox value={checked} onChange={handleClick} />
    </L.Tooltip>
  </L.Div>
);
