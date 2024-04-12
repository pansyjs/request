import React from 'react'
import ReactDOM from 'react-dom/client'
import { Message } from '@arco-design/web-react'
import { initializeInstance } from '@pansy/request'
import App from './App.tsx'
import './server'

initializeInstance({
  baseURL: '/api',
  timeout: 60 * 1000,
  errorConfig: {
    errorHandler: (data, error) => {
      console.log('error', error)
      if (data && data.message) {
        Message.error(data.message)
      }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
