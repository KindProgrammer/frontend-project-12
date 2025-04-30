import React from 'react';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import resources from './language/index.js';
import filter from 'leo-profanity';
import { Provider } from 'react-redux';
import store from './store/store.js';
import App from './App.jsx';
import { Provider as RollbarProvider , ErrorBoundary } from '@rollbar/react';

const init = async () => {
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;