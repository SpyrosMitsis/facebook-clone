import { Outlet } from 'react-router'
import './App.scss'
import { AuthProvider } from './Context/AuthProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <main className='App'>
          <Outlet />
        </main>
      </AuthProvider>
    </>
  );
}

export default App;
