import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import Pricing from './pages/Pricing'
import OpenSource from './pages/OpenSource'
import Security from './pages/Security'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/open-source" element={<OpenSource />} />
        <Route path="/security" element={<Security />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
