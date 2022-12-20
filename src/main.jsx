import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {TransactionProvider} from './context/TransactionContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    //Here we are adding the universal Context
  <TransactionProvider>

  <React.StrictMode>
    <App />
  </React.StrictMode>

  </TransactionProvider>
)
