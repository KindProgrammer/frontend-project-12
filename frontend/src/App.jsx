import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login from './Pages/Login.jsx';
import Registration from './Pages/Registration.jsx';
import NotFound from './Pages/NotFound.jsx';
import MainPage from './Pages/MainPage.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import routes from './routes.js';
import NavigationMenu from './Components/NavigationMenu.jsx';

function App() {
  return (
    <div className="d-flex flex-column h-100">
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider>
        <NavigationMenu />
        <Routes>
            <Route path={routes.mainPagePath} element={<MainPage />} />
            <Route path={routes.loginPagePath} element={<Login />} />
            <Route path={routes.registrationPagePath} element={<Registration />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </AuthProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
