import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap';
import './index.scss';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { I18nextProvider } from 'react-i18next';
import i18n from './init.js';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  </StrictMode>,
)
