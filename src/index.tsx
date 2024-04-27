import React from 'react';
import ReactDOM from 'react-dom';

import { App } from '@src/app';

export const render = (): void => {
  ReactDOM.render(<App />, document.getElementById('app'));
};

window.addEventListener('load', render);
