import { Outlet } from 'react-router-dom';
import Navbar from './layout/NavBar/index.jsx'
import './App.css'
import Footer from './layout/Footer/index.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <div className='flex flex-col h-screen justify-between'>

      <ToastContainer
        position='bottom-right'
        theme='light'
        pauseOnHover
        autoClose={1500}
      />
      <Navbar />
      <main className='mb-auto w-10/12 max-w-4xl mx-auto'>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default App