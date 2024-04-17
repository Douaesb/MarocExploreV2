
  import Register from '../pages/register';
  import Login from '../pages/login';
  import Home from '../pages/home';
  import Navbar from '../components/header'; 

  import { ReactDOM} from 'react'
  import {BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
  import Itineraire from '../pages/itineraire';
  import Accueil from '../pages/accueil';
  import ListeAVisiter from '../pages/Liste';
  import ModifyItineraire from '../pages/modifierItineraire';
  import DestinationPage from '../pages/destinations';


  function App() {
    return ( 
      <>
      <BrowserRouter>
      <Routes>
        {/* <Route index element={ <Home /> }/> */}
        <Route path='/login' element={ <Login /> }/>
        <Route index element={ <Accueil /> }/>
        <Route path='/register' element={ <Register /> }/>
        {/* <Route path='/login' element={ <Login /> }/> */}
        <Route path='/itineraire' element={ <Itineraire /> }/>
        <Route path='/ListeAVisiter' element={ <ListeAVisiter /> }/>
        <Route path='/modifierItineraire/:itineraireId' element={ <ModifyItineraire /> }/>
        <Route path="/destination/:itineraireId" element={<DestinationPage />} />

        {/* <Route path="/register" element={<Navigate to="/" replace />} /> */}
      </Routes>
      </BrowserRouter>
      </>
    )
  }

  export default App