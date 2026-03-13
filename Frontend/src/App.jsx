// App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Landing Page Components
import Navbar from './pages/LandingPage/Navbar'
import Hero from './pages/LandingPage/Hero'
import Story from './pages/LandingPage/Story'
import Features from './pages/LandingPage/Features'
import Dishes from './pages/LandingPage/Dishes'
import Stats from './pages/LandingPage/Stats'
import CTA from './pages/LandingPage/CTA'
import Footer from './pages/LandingPage/Footer'

// Auth
import Login from './pages/Auth/Login'
<<<<<<< HEAD
//import Register from './pages/Auth/Register'
=======
// import Register from './pages/Auth/Register'
>>>>>>> 9574161521a8ea119966c574ab016bbf79bfd3e1

// Dashboards
import UserDashboard from './pages/Dashboard/UserDashboard'
import KitchenDashboard from './pages/Dashboard/KitchenDashboard'

// Admin Layout and Views
import AdminLayout from './layouts/AdminLayout'
import {
  AdminOverview,
  MenuManagement,
  AdminCategories,
  AdminOrders,
  AdminReports,
  AdminSettings
} from './pages/Admin'

// Context Providers
<<<<<<< HEAD
/*import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'*/
=======
import { AuthProvider } from './context/AuthContext'
>>>>>>> 9574161521a8ea119966c574ab016bbf79bfd3e1

// LandingPage Component (no Router here!)
function LandingPage() {
  return (
<<<<<<< HEAD
    <>
=======
    <AuthProvider>
>>>>>>> 9574161521a8ea119966c574ab016bbf79bfd3e1
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="font-sans text-gray-800 antialiased min-h-screen pb-0">
              <Hero />
              <Story />
              <Features />
              <Dishes />
              <Stats />
              <CTA />
              <Footer />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
<<<<<<< HEAD

      </Routes>
    </>
=======
      </Routes>
    </AuthProvider>
>>>>>>> 9574161521a8ea119966c574ab016bbf79bfd3e1
  )
}

function App() {

  return (
    <Router>
      <Routes>
        {/* Landing Page Routes */}
        <Route path="/*" element={<LandingPage />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/kitchen" element={<KitchenDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="menu" element={<MenuManagement />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App