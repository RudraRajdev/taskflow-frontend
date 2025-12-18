import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HeroUIProvider } from "@heroui/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <HeroUIProvider>
    <App />
  </HeroUIProvider>
)
