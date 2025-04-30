import { createRoot } from 'react-dom/client'
import 'bootstrap';
import './index.scss';
import init from './init.jsx';

const app = async () => {
  const vdom = await init();

  createRoot(document.getElementById('root')).render(
    vdom,
  )
};

app();