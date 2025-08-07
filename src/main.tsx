import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
// アプリ全体をBrowserRouterでラップ→ルーティング機能を有効化

const rootElement = document.getElementById("root")

createRoot(rootElement!).render(
  <StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </StrictMode>
);
