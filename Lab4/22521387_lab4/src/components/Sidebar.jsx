import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { AiOutlineFolderView } from "react-icons/ai";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; 

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-gray-500 text-white h-screen p-4 flex flex-col justify-between`}
    >
      <div>
        <h2 className="text-xl font-bold text-center">Sidebar</h2>
        <div className="space-y-4 mt-4 w-full">
          <Link to="/">
            <button className="bg-clip-border p-4 bg-violet-600 border-4 border-violet-300 border-dashed w-full">
              <div className="flex flex-col items-center justify-center text-white">
                <FaHome className="text-white" size={isOpen ? 24 : 20} />
                {isOpen && <p>Home</p>}
              </div>
            </button>
          </Link>

          <Link to="/todoapp">
            <button className="bg-clip-border p-4 bg-violet-600 border-4 border-violet-300 border-dashed w-full">
              <div className="flex flex-col items-center justify-center text-white">
                <AiOutlineFolderView className="text-white" size={isOpen ? 24 : 20} />
                {isOpen && <p>TodoApp</p>}
              </div>
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
