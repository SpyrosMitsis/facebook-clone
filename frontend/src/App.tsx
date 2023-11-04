import { Navigate, Route, Routes } from 'react-router'
import './App.scss'
import { RequireAuth } from 'react-auth-kit'
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import { useIsAuthenticated } from 'react-auth-kit';
import Profile from './Pages/Profile/Profile';


function App() {

  const isAuthenticated = useIsAuthenticated()
  

  if (isAuthenticated()) {
    return (
      <>
        <main className='App'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path='/ProfilePage' element={<Profile/>} />
          </Routes>
        </main>
      </>
    )
  } else {
    return (
      <>
        <main className='App'>
          <Routes>
            <Route path='/' element={ <Navigate to='/login' replace/>} />
            <Route path='/home' element={ <Navigate to='/login' replace/>} />
            <Route path='/login' element={<Login />} />
          </Routes>

        </main>
      </>
    )
  }

}
export default App;
