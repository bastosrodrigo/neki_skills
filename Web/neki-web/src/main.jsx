import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Routes from './routes/Routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
)
