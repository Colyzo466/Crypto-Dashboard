import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Crypto Dashboard</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-blue-600 rounded">Connect Wallet</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;