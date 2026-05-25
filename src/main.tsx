import { createRoot } from 'react-dom/client';
import { loadAllContent } from './content/loader';
import App from './App';
import './style.css';

loadAllContent().then(() => {
  createRoot(document.getElementById('root')!).render(<App />);
});
