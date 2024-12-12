import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'



const Logout = () =>{
  localStorage.clear()
  return <Navigate to="/login"/>
}

const RegisterAndLogout = () =>{
  localStorage.clear()
  return <Register/>
}
function App() {
 

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element= {<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<RegisterAndLogout />} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
