import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import Home from './pages/Home'
import Empresa from './pages/Empresa'
import Projetos from './pages/Projetos'
import Contato from './pages/Contato'

import Navbar from './Components/layout/Navbar'
import Footer from './Components/layout/Footer'

import Container from './Components/layout/Container'


function App() {
  return (
   <Router>
    
    <Navbar />
    <Container customClass="min-height">
      <Routes>
          <Route path='/' element ={<Home />} />
          <Route path='/Empresa' element ={<Empresa />} />
          <Route path='/Projetos' element ={<Projetos />} />
          <Route path='/Contato' element ={<Contato />} />
      </Routes>
    </Container>
    <Footer />  
   </Router>
  )
}

export default App;
