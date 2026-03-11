import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './pages/LandingPage/Navbar'
import Hero from './pages/LandingPage/Hero'
import Story from './pages/LandingPage/Story'
import Features from './pages/LandingPage/Features'
import Dishes from './pages/LandingPage/Dishes'
import Stats from './pages/LandingPage/Stats'
import CTA from './pages/LandingPage/CTA'
import Footer from './pages/LandingPage/Footer'

import UserDashboard from './pages/Dashboard/UserDashboard'
import KitchenDashboard from './pages/Dashboard/KitchenDashboard'

// Admin Views
import AdminLayout from './layouts/AdminLayout'
import {
  AdminOverview,
  MenuManagement,
  AdminCategories,
  AdminOrders,
  AdminReports,
  AdminSettings
} from './pages/Admin'

function LandingPage() {
  return (
    <div className="font-sans text-gray-800 antialiased min-h-screen pb-0">
      <Navbar />
      <Hero />
      <Story />
      <Features />
      <Dishes />
      <Stats />
      <CTA />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
