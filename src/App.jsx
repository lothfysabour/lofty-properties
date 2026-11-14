import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import ApartmentGrid from './components/ApartmentGrid'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ListProperty from './components/ListProperty'
import BlankPage from './components/BlankPage'

export default function App() {
  const [page, setPage] = useState('home')

  const navigate = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-navy-900">
      <Navbar navigate={navigate} currentPage={page} />

      {page === 'list-property' ? (
        <ListProperty navigate={navigate} />
      ) : page === 'menage' ? (
        <BlankPage navigate={navigate} title="Service Ménage" />
      ) : page === 'partenaires' ? (
        <BlankPage navigate={navigate} title="Partenaires" />
      ) : (
        <>
          <Hero />
          <About />
          <ApartmentGrid />
          <Contact />
          <Footer navigate={navigate} />
        </>
      )}
    </div>
  )
}
