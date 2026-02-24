import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import { Login } from './pages/login/Login'
import { ProtectRoute } from './components/auth/ProtectRoute'
import { Dashboard } from './pages/dashboard/Dashboard'
import { AdminUser } from './pages/AdminUser/AdminUser'
import { MainLayout } from './layouts/MainLayout'
import './App.css'
import { AuthProvider } from './providers/AuthProvider'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>

          <Route path="/login" element={<Login />} />

          <Route>
            <Route element={<AuthProvider />}>
              <Route element={<ProtectRoute />}>

                <Route element={<MainLayout />}>
                  <Route path="/dashboard" index element={<Dashboard />} />
                  <Route path="/admin-users" element={<AdminUser />} />
                  <Route index element={<AdminUser />} />
                </Route>

              </Route>
            </Route>

          </Route>

        </Routes>

      </ThemeProvider>
    </>
  )
}

export default App
