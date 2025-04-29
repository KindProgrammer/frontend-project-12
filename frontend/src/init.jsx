// файл src/i18next.js
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import resources from './language/index.js';
import filter from 'leo-profanity';
import { Provider } from 'react-redux';
import store from './store/store.js';
import App from './App.jsx';

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

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  );
};

export default init;