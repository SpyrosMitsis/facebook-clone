import { Outlet, Route, Routes } from 'react-router'
import React from 'react';
import './App.scss'
import { AuthProvider, RequireAuth } from 'react-auth-kit'
import axios from './api/axios';
import { BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login/Login';

function App() {


  return (
    <>
        <main className='App'>
        <Routes>
        <Route path='/' element={ <Login />} />
          <Route path={'/secure'} element={
            <RequireAuth loginPath={'/'}>
              <div>
                Secure
              </div>
            </RequireAuth>
          } />
        </Routes>

        </main>
    </>

  )

}


 // return (
 //   <>
 //     <AuthProvider authType={'cookie'}
 //       authName={'_auth'}
 //       cookieDomain={window.location.hostname}
 //       cookieSecure={false}>
 //       <main className='App'>
 //         <Outlet />
 //       </main>
 //     </AuthProvider>
 //   </>
 // );


export default App;
