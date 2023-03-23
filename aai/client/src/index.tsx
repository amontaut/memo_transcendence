import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//pages and components
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = createRoot(rootElement)

root.render(
    <React.StrictMode>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </Router>
    </React.StrictMode>
)
