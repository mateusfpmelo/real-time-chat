import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginRegister from './pages/LoginRegister'
import Home from './pages/Home'
import Logout from './pages/Logout'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/logout" element={<Logout />}/>
      </Routes>
    </Router>
  )
}

export default App
