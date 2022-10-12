import React from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Services from './components/Services';
import Transactions from './components/Transactions';
import Welcome from './components/Welcome';

function App() {
  return (
      <div className='App header flex flex-col gap-xl bg-gradient-to-tr from-[#5D89DE] to-[#8E466D]'>
        <Navbar />
        <Welcome />
        <Services />
        <Transactions />
        <Footer />
      </div>
  );
}

export default App;
