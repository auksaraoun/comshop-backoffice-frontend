import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import { Login } from './pages/login/Login'
import { ProtectRoute } from './components/auth/ProtectRoute'
import { Dashboard } from './pages/dashboard/Dashboard'
import './App.css'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>

        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
