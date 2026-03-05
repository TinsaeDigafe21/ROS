import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Story from './components/Story'
import Features from './components/Features'
import Dishes from './components/Dishes'
import Stats from './components/Stats'
import CTA from './components/CTA'
import Footer from './components/Footer'

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
