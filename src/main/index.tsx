import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import { HashRouter } from 'react-router-dom';
import '../common/utils';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('app-root'),
);
