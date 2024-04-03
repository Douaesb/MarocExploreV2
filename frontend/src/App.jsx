
import Register from '../pages/register';
import Login from '../pages/login';
import Home from '../pages/home';
import Navbar from '../components/header'; 

import { ReactDOM} from 'react'
import {BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Itineraire from '../pages/itineraire';


function App() {
  return ( 
    <>
    <BrowserRouter>
     <Routes>
      {/* <Route index element={ <Home /> }/> */}
      <Route path='/home' element={ <Home /> }/>
      <Route path='/register' element={ <Register /> }/>
      <Route path='/login' element={ <Login /> }/>
      <Route path='/itineraire' element={ <Itineraire /> }/>

      {/* <Route path="/register" element={<Navigate to="/" replace />} /> */}
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App