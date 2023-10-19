import { useState } from 'react'
import './App.scss'
import Login from './Pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='App'>
    <Login />
    </div>
    </>
  )
}

export default App
