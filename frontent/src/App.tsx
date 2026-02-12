import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import Send from './pages/Send'
import type React from 'react'
import { Navigate } from 'react-router-dom'
import UpdatePassword from './pages/UpdatePassword'

function App() {

  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />

          <Route path='/dashboard' element={
              <SecureRoute>
                <Dashboard />
              </SecureRoute>
          }>
          </Route>

          <Route path='/send' element={
              <SecureRoute>
                <Send />
              </SecureRoute>
          }>
          </Route>

          <Route path='/changePass' element={<UpdatePassword />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  )

}

function SecureRoute({children}: {children: React.ReactNode}) {

  const token = localStorage.getItem("token");

  if(!token){
    alert("you have to login first");
    return <Navigate to={"/signin"} />
  }

  return <>{children}</>
}

function Error() {
  return(
    <div className='w-full h-screen bg-gray-700 flex items-center justify-center'>
      <div className='w-150 h-90 bg-red-700 rounded-xl flex justify-center items-center'>
        <h1 className='text-3xl font-bold '>Page Not Found</h1>
      </div>
    </div>
  )
}

export default App
