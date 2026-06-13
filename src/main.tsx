import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

// Entrance animation: 'intro' class already added in index.html
// Remove after 60ms, then add 'revealed' after 1300ms more
function reveal() {
  document.documentElement.classList.remove('intro')
  setTimeout(() => {
    document.documentElement.classList.add('revealed')
  }, 1300)
}

if (document.readyState !== 'loading') {
  setTimeout(reveal, 60)
} else {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(reveal, 60)
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
