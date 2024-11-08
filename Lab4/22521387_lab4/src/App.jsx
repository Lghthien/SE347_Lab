import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TodoApp from './components/TodoApp';
import Home from './components/Home';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Hàm để chuyển đổi trạng thái Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`p-4 w-full ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todoapp" element={<TodoApp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
