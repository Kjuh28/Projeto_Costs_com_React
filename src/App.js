import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import Home from './pages/Home'
import Empresa from './pages/Empresa'
import Contato from './pages/Contato'
import NavBar from './Components/layout/NavBar'
import Footer from './Components/layout/Footer'

function App() {
  return (
   <Router>
    
    <NavBar />
      <Routes>
        <Route path='/' element ={<Home />} />
        <Route path='/Empresa' element ={<Empresa />} />
        <Route path='/Contato' element ={<Contato />} />
      </Routes>
    <Footer />  
   </Router>
  )
}

export default App;
