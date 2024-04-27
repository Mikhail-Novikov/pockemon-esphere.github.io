import React from 'react';
import * as L from 'korus-ui';

/**
 * Глобальная ошибка
 *
 * @returns компонент
 */
export const GlobalError: React.FC = () => (
  <L.Div _flexRow _justifyContentCenter _alignItemsCenter _height100>
    <L.Div _containerAuth _txtCenter>
      <L.Img
        _icon128
        _marginBottom32
        src="https://cdn.esphere.ru/images/newedo/help.svg"
        alt="Сервис недоступен"
      />
      <L.H2 _marginBottom16>Что-то пошло не так</L.H2>
      <L.P>
        Пожалуйста, обратитесь в&nbsp;службу техподдержки
        <br />
        по&nbsp;номеру 8 800 100-8-812 или по&nbsp;почте &#32;
        <L.A>help@esphere.ru</L.A>
      </L.P>
    </L.Div>
  </L.Div>
);
