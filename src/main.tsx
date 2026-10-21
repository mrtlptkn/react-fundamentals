import { createRoot } from 'react-dom/client';
import './index.css';
// import TodoPageV2 from './todos/TodoPageV2';
import UseEffectSample from './todos/UseEffectSample';

// root içerisinde birden fazla component göstermek için wrapper component tanımı yaparız.

createRoot(document.getElementById('root')!).render(<UseEffectSample />);

// Alt + Shift + O unused code line remove
// Alt + Shift + F code satırı düzenleme
// CTRL + K + C -> Comment line
// CTRL + K + U -> Uncomment
// CTRL + J -> Terminal kısa yolu
// CTRL + B -> Explorer penceresi aç kapat
// CTRL + C -> terminali sonlandırma kısa yolu
