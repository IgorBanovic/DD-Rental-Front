import { Link, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Home from './pages/Home'
import About from './pages/About'
import Jokes from './pages/Jokes'
import SavedJoke from './pages/SavedJoke'
import './App.css'

function App() {
  const [savedJoke, setSavedJoke] = useState('No saved joke yet');

  return (
    <>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/jokes">Jokes</Link>
          <Link to="/saved">Saved Joke</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/jokes" saved={savedJoke} element={<Jokes />} />
          <Route path="/saved" saved={savedJoke} element={<SavedJoke />} />
        </Routes>

        <footer>
          Jokes App &copy; 2026
        </footer>
      </div>
    </>
  )
}

export default App
