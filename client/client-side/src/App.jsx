
import './App.css'
import Room from './pages/Room'
import Confernce from './pages/Confernce';
import { Route,Routes } from 'react-router-dom'

function App(){
  return(
    <Routes>
      <Route path='/' element={<Room />} />
      <Route path="/room" element={<Confernce />} />
    </Routes>
  )
}


export default App
