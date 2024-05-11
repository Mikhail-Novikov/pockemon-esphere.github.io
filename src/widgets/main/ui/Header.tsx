import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { globalConfig } from '@shared/config';

export const Header: React.FC = () => (
  <L.Header className="user-box personal-box document-header">
    <L.Nav>
      <Link to={globalConfig.routes.home()} className="txt-large txt-bold">
        <img
          src="https://cdn.esphere.ru/images/auth2/logo-korus.png"
          alt="СБЕР Корус"
          height="32"
          className="margin-right-8"
        />
      </Link>
      <L.Ul className="menu-h company txt-right txt-small right txt-bold">
        <L.Li>
          <Link to={globalConfig.routes.pokemons()}>Список Покемонов</Link>
        </L.Li>
        <L.Li>
          <Link to={globalConfig.routes.compare()}>Сравнение Покемонов</Link>
        </L.Li>
        <L.Li>
          <Link to={globalConfig.routes.home()}>ТЗ Проекта</Link>
        </L.Li>
      </L.Ul>
    </L.Nav>
  </L.Header>
);
