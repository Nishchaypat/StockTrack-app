// src/pages/Watchlist.js
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

const Watchlist = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample watchlist data (in real app, this would come from your backend)
  const watchlistStocks = [
    { 
      symbol: 'AAPL', 
      name: 'Apple Inc.', 
      sector: 'Technology',
      currentPrice: 178.92,
      priceChange: 2.45,
      percentChange: 1.38,
      addedDate: '2024-03-15',
      description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.'
    },
    { 
      symbol: 'TSLA', 
      name: 'Tesla, Inc.', 
      sector: 'Automotive',
      currentPrice: 245.67,
      priceChange: -3.21,
      percentChange: -1.29,
      addedDate: '2024-03-14',
      description: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.'
    },
    // Add more watchlist stocks as needed
  ];

  const filteredStocks = watchlistStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Watchlist</h1>
          <p className="text-gray-400 mt-1">Track your favorite stocks</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search watchlist..."
              className="bg-gray-700 text-white px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
      </div>

      {/* Watchlist Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Change</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sector</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredStocks.map((stock) => (
              <tr 
                key={stock.symbol}
                className="hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedStock(stock);
                  setIsModalOpen(true);
                }}
              >
                <td className="px-6 py-4">
                  <span className="text-blue-400 font-medium">{stock.symbol}</span>
                </td>
                <td className="px-6 py-4 text-white">{stock.name}</td>
                <td className="px-6 py-4 text-white">
                  ${stock.currentPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center ${
                    stock.priceChange >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <i className={`fas fa-arrow-${stock.priceChange >= 0 ? 'up' : 'down'} mr-2`}></i>
                    {Math.abs(stock.percentChange)}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400">
                    {stock.sector}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Remove from watchlist logic here
                    }}
                  >
                    <i className="fas fa-star"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredStocks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No stocks found in your watchlist</p>
          </div>
        )}
      </div>

      {/* Stock Details Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-gray-800 rounded-xl p-6 max-w-md mx-auto">
            {selectedStock && (
              <>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <Dialog.Title className="text-xl font-bold text-white">
                      {selectedStock.symbol}
                    </Dialog.Title>
                    <p className="text-gray-400">{selectedStock.name}</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Current Price</span>
                    <span className="text-white text-xl font-bold">
                      ${selectedStock.currentPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Change</span>
                    <span className={`${
                      selectedStock.priceChange >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {selectedStock.priceChange >= 0 ? '+' : ''}
                      {selectedStock.priceChange.toFixed(2)} ({selectedStock.percentChange}%)
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Sector</h3>
                    <p className="text-white">{selectedStock.sector}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Added to Watchlist</h3>
                    <p className="text-white">{new Date(selectedStock.addedDate).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Description</h3>
                    <p className="text-white text-sm">{selectedStock.description}</p>
                  </div>

                  <button
                    onClick={() => {
                      // Remove from watchlist logic here
                      setIsModalOpen(false);
                    }}
                    className="w-full mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove from Watchlist
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Watchlist;