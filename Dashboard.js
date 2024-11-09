// frontend/src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { stockAPI } from '../services/api';

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await stockAPI.getStocks();
      setStocks(response.data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    } finally {
      setLoading(false);
    }
  };

  const sectors = ['All', ...new Set(stocks.map(stock => stock.sector))];

  const filteredStocks = stocks.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stock.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'All' || stock.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="p-6">
      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by symbol or company name..."
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
        >
          {sectors.map(sector => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
      </div>

      {/* Stocks Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
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
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400">
                    {stock.sector}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to favorites logic here
                    }}
                  >
                    <i className="fas fa-star"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                <div className="flex justify-between items-start mb-4">
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
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Sector</h3>
                    <p className="text-white">{selectedStock.sector}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Description</h3>
                    <p className="text-white">{selectedStock.description}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Dashboard;