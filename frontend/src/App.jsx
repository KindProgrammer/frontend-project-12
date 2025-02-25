import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Pages/Login.jsx';
import NotFound from './Pages/NotFound.jsx';
import MainPage from './Pages/MainPage.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import routes from './routes.js';
import NavigationMenu from './Components/NavigationMenu.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavigationMenu />
        <Routes>
            <Route path={routes.mainPagePath} element={<MainPage />} />
            <Route path={routes.loginPagePath} element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
