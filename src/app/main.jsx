import ReactDOM from 'react-dom/client'
import AppProviders from '@/app/providers/AppProviders'
import AppRouter from '@/app/router/AppRouter'
import '@/styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProviders>
    <AppRouter />
  </AppProviders>
)
