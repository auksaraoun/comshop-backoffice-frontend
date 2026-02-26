import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import { Login } from './pages/Login/Login'
import { ProtectRoute } from './components/auth/ProtectRoute'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { AdminUser } from './pages/AdminUser/AdminUser'
import { MainLayout } from './layouts/MainLayout'
import './App.css'
import { AuthProvider } from './providers/AuthProvider'
import { Order } from './pages/Order/Order'
import { ProductType } from './pages/ProductType/ProductType'
import { ProductStock } from './pages/ProductStock/ProductStock'


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route element={<AuthProvider />}>
          <Route element={<ProtectRoute />}>

            <Route element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/admin-users" element={<AdminUser />} />
              <Route path="/product-types" element={<ProductType />} />
              <Route path="/product-stocks" element={<ProductStock />} />
              <Route path="/orders" element={<Order />} />
            </Route>

          </Route>
        </Route>


      </Routes>

    </ThemeProvider>
  )
}

export default App
