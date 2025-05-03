import React, { useState } from 'react';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import Sidebar from '../components/Sidebar';

function Home() {
  const [view, setView] = useState('ComprarTicket'); // Updated initial state to handle 'ComprarTicket'

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header setView={setView} />

      {/* Main Content Area */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar onSelect={setView} />

        {/* Main Content */}
        <MainContent view={view} />
      </div>
    </div>
  );
}

export default Home;