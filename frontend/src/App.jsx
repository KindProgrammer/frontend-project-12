import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Pages/Login.jsx';
import NotFound from './Pages/NotFound.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
