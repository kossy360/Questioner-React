import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'semantic-ui-css/semantic.min.css';
import 'overlayscrollbars/css/OverlayScrollbars.min.css';
import App from './containers/App';
import Store, { persistor } from './store';
import './style/index.scss';

render(<Provider store={Store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
</Provider>, document.getElementById('root'));
