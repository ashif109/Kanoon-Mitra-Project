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
<<<<<<< HEAD
import Dashboard from './Pages/Dashboard'

// Service Detail Pages
import Firpage from './Pages/services/Firpage'
import LegalConsultationPage from './Pages/services/LegalConsultationPage'
import LawyerConnectPage from './Pages/services/LawyerConnectPage'
import RtiPage from './Pages/services/RtiPage'
import CyberComplaintPage from './Pages/services/CyberComplaintPage'
import LegalDocsPage from './Pages/services/LegalDocsPage'
=======

import Dashboard from './Pages/Dashboard'
>>>>>>> 329acda15b55fc1ff2b915c19aed00ee9a4671cf

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

<<<<<<< HEAD
        {/* Individual Service Detail Routes */}
        <Route path='/services/legal-consultation' element={<LegalConsultationPage />} />
        <Route path='/services/fir-guidance' element={<Firpage />} />
        <Route path='/services/lawyer-connect' element={<LawyerConnectPage />} />
        <Route path='/services/rti-filing' element={<RtiPage />} />
        <Route path='/services/cyber-complaint' element={<CyberComplaintPage />} />
        <Route path='/services/free-legal-docs' element={<LegalDocsPage />} />
=======
>>>>>>> 329acda15b55fc1ff2b915c19aed00ee9a4671cf
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
