import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Pages/Login.jsx';
import NotFound from './Pages/NotFound.jsx';
import MainPage from './Pages/MainPage.jsx';
import routes from './routes.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.mainPagePath} element={<MainPage />} />
        <Route path={routes.loginPagePath} element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
