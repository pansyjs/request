import React from 'react'
import ReactDOM from 'react-dom/client'
import { initializeInstance } from '@pansy/request'
import App from './App.tsx'

initializeInstance({
  timeout: 60 * 1000
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
