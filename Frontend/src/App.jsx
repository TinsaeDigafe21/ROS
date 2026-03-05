import React from 'react'
import Navbar from './components/LandingPage/Navbar'
import Hero from './components/LandingPage/Hero'
import Story from './components/LandingPage/Story'
import Features from './components/LandingPage/Features'
import Dishes from './components/LandingPage/Dishes'
import Stats from './components/LandingPage/Stats'
import CTA from './components/LandingPage/CTA'
import Footer from './components/LandingPage/Footer'

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
