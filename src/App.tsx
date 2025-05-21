import React from 'react'
import Header from './pages/Header'
import Footer from './pages/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'

function App() {

  return (
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App
