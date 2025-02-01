import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Example from './Pages/Login.jsx';
import NotFound from './Pages/NotFound.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Example />} />
        <Route path="login" element={<Example />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
