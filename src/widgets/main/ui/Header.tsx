import React, { useState } from 'react';
import * as L from 'korus-ui';
import { Link, useHistory } from 'react-router-dom';

// ...

import { globalConfig } from '@shared/config';
import { pokemonModel } from '@entities/pokemon';

export const Header: React.FC = () => {
  const history = useHistory();
  const [isQueryLoading, setQueryLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchForm, setSearchForm] = useState({
    ability: '',
    url: '',
    query: '',
  });

  const pokemonsList = pokemonModel.selectors.getAllPokemons();
  const names = pokemonsList?.map((item: { name: string }) => item.name);
  const url = pokemonsList?.map((item: { url: string }) => item.url);

  const handleSearchItemClick = (item: string) => (): void => {
    setSearchForm({ ...searchForm, url: url[names.indexOf(item)] });
    history.push(`/pokemon/${item}`);
  };

  const SearchBoxItem: L.AutoCompleteTypes.AutoCompleteProps['itemRender'] = (
    renderData,
  ) => {
    const {
      componentProps: { item },
      elementProps,
    } = renderData;

    return (
      <L.Li {...elementProps} onClick={handleSearchItemClick(item as string)}>
        {item}
      </L.Li>
    );
  };

  const handleAutoCompleteChange = (
    ev: L.AutoCompleteTypes.ChangeEvent,
  ): void => {
    const { value } = ev.component;

    if (value.length >= 2) {
      setQueryLoading(true);
      setTimeout(() => {
        setQueryLoading(false);
      }, 300);

      setSearchData(names);
    }
  };

  return (
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
        <L.Div className="width-50 right">
          <L.Div className="margin-right-8 width-30">
            <L.AutoComplete
              placeholder="Поиск по названию покемона"
              minSearchLength={2}
              className="width-100 xs-txt-center"
              itemRender={SearchBoxItem}
              data={searchData}
              textField="fullName"
              onChange={handleAutoCompleteChange}
              isLoading={isQueryLoading}
              inputRender={({ Element, elementProps }) => (
                <>
                  <L.I className="prodicon-search margin-left-8" />
                  <Element {...elementProps} />
                </>
              )}
            />
          </L.Div>
          <L.Ul className="menu-h company txt-right txt-small right txt-bold">
            <L.Li>
              <Link to={globalConfig.routes.pokemons()}>Список Покемонов</Link>
            </L.Li>
            <L.Li>
              <Link to={globalConfig.routes.compare()}>
                Сравнение Покемонов
              </Link>
            </L.Li>
            <L.Li>
              <Link to={globalConfig.routes.home()}>ТЗ Проекта</Link>
            </L.Li>
          </L.Ul>
        </L.Div>
      </L.Nav>
    </L.Header>
  );
};
