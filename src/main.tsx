import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { NuqsAdapter } from 'nuqs/adapters/react'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <NuqsAdapter>
      <QueryClientProvider client={queryClient} >
        <App />
      </QueryClientProvider>
    </NuqsAdapter>
  </BrowserRouter>
  // </StrictMode>,
)
