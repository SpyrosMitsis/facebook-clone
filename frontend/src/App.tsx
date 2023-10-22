import { Outlet } from 'react-router'
import './App.scss'
  
function App() {
  return (
    <>
        <div className='App'>
          <Outlet />
        </div>
    </>
  );
}

export default App;
