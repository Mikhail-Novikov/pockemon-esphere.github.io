import React from 'react';
import * as L from 'korus-ui';

export type TogglePokemonProps = {
  taskId: number;
};

/**
 * Чекбокс - перключатель с всплывающей подсказкой, для выбора сравнения покемонов
 *
 * @param {number} pokemonId - Уникальный идентификатор покемона
 * @returns {ReactElement} Компонент checkbox
 */
export const ToggleSelect: React.FC<TogglePokemonProps> = ({
  pokemonId,
}: TogglePokemonProps): React.ReactElement => {
  const [checked, setChecked] = React.useState<boolean>(false);

  return (
    <L.Div _wrapperCheckbox onClick={(ev) => ev.stopPropagation()}>
      <L.Tooltip title={!checked ? 'Выбрать для сравнения' : 'Выбрано'}>
        <L.CheckBox value={checked} onChange={() => setChecked(!checked)} />
      </L.Tooltip>
    </L.Div>
  );
};
