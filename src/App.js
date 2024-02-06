import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginRegister from './pages/LoginRegister'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
      </Routes>
    </Router>
  )
}

export default App
