import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbarr from './Components/Navbarr'
import Footer from './Components/Footer'

import Home from './Pages/Home'
import Services from './Pages/Services'
import Contact from './Pages/Contact'
import AskLawyer from './Pages/AskLawyer'
import KnowledgeHub from './Pages/KnowledgeHub'
import LawyerPortal from "./Pages/LawyerPortal";

import Dashboard from './Pages/Dashboard'

const App = () => {
  return (
    <Router>
      <Navbarr />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/AskLawyer' element={<AskLawyer />} />
        <Route path='/KnowledgeHub' element={<KnowledgeHub />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/LawyerPortal' element={<LawyerPortal />} />
        <Route path='/Dashboard' element={<Dashboard />} />

      </Routes>

      <Footer />
    </Router>
  )
}

export default App
