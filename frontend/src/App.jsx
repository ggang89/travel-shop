

import { Outlet } from 'react-router-dom'
import Navbar from "./layout/NavBar/index"
import './App.css'
import Footer from './layout/Footer';

function App() {
 

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}

export default App
