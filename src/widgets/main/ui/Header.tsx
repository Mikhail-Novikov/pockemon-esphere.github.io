import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { globalConfig } from '@shared/config';

export const Header: React.FC = () => (
  <L.Header className="user-box personal-box">
    <L.Nav>
      <Link to={globalConfig.routes.home()} className="txt-large txt-bold">
        <img
          src="https://cdn.esphere.ru/images/auth2/logo-korus.png"
          alt="СБЕР Корус"
          height="32"
          className="margin-right-8"
        />
        Test Project
      </Link>
      <L.Ul className="menu-h company txt-right txt-small right txt-bold">
        <L.Li>
          <Link to={globalConfig.routes.home()}>Home page</Link>
        </L.Li>
        <L.Li>
          <Link to={globalConfig.routes.tasks()}>Tasks page</Link>
        </L.Li>
        <L.Li>
          <Link to={globalConfig.routes.about()}>About page</Link>
        </L.Li>
        <L.Li className="level-1">
          <L.Span className="dropdown-wrapper">
            <L.Div>
              <L.Div className="txt-bold user">
                Цветкова Иванка Константиновна
              </L.Div>
              <L.Img
                src="https://cdn.esphere.ru/images/nova/icons/check.svg"
                className="align-top"
              />
              <L.Span className="company-name">ООО «Ромашка»</L.Span>
            </L.Div>
          </L.Span>
        </L.Li>
      </L.Ul>
    </L.Nav>
  </L.Header>
);
