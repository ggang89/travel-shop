import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './layout/NavBar/index.jsx'
import './App.css'
import Footer from './layout/Footer/index.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./store/thunkFunctions";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user?.isAuth);
  const { pathname } = useLocation();
  
  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  },[isAuth,pathname,dispatch])

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