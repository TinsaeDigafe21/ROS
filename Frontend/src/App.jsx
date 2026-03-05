import React from 'react'
import Navbar from './pages/LandingPage/Navbar'
import Hero from './pages/LandingPage/Hero'
import Story from './pages/LandingPage/Story'
import Features from './pages/LandingPage/Features'
import Dishes from './pages/LandingPage/Dishes'
import Stats from './pages/LandingPage/Stats'
import CTA from './pages/LandingPage/CTA'
import Footer from './pages/LandingPage/Footer'

function App() {
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

export default App
