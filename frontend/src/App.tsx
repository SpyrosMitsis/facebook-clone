import { Outlet, Route, Routes } from 'react-router'
import React from 'react';
import './App.scss'
import { RequireAuth } from 'react-auth-kit'
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import { useIsAuthenticated } from 'react-auth-kit';


function App() {

  const isAuthenticated = useIsAuthenticated()

  if (isAuthenticated()) {
    return (
      <>
        <main className='App'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path={'/home'} element={
              <RequireAuth loginPath={'/login'}>
                <Home />
              </RequireAuth>
            } />
          </Routes>

        </main>
      </>

    )
  } else {
    return (
      <>
        <main className='App'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path={'/'} element={
              <RequireAuth loginPath={'/login'}>
                <Home />
              </RequireAuth>
            } />
          </Routes>

        </main>
      </>
    )
  }

}
export default App;
