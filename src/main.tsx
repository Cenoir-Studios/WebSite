import { createRoot } from 'react-dom/client';
import { loadAllContent } from './content/loader';
import App from './App';
import './style.css';

const storedLang = (localStorage.getItem('cenoir-lang') || 'en') as 'en' | 'ua' | 'pl';
loadAllContent(storedLang).then(() => {
  createRoot(document.getElementById('root')!).render(<App />);
});
