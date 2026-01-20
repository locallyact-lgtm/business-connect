
import React, { useState, useMemo, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import BusinessCard from './components/BusinessCard';
import AddBusinessModal from './components/AddBusinessModal';
import { MOCK_BUSINESSES } from './constants';
import { Category, Business } from './types';
import { fetchBusinessesFromWP, saveBusinessToWP } from './services/wordpressService';

const App: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>(MOCK_BUSINESSES);
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const wpData = await fetchBusinessesFromWP();
      if (wpData.length > 0) {
        setBusinesses(wpData);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((b) => {
      const matchesCategory = selectedCategory === Category.ALL || b.category === selectedCategory;
      const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            b.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            b.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm, businesses]);

  const handleAddBusiness = async (newBusiness: Business) => {
    // Optimistic update
    setBusinesses(prev => [newBusiness, ...prev]);
    
    // Attempt to persist to WP
    const saved = await saveBusinessToWP(newBusiness);
    if (saved) {
      console.log("Successfully synced with WordPress!");
    }

    setSelectedCategory(Category.ALL);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center px-6 md:px-12 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg">E</div>
          <span className="font-extrabold text-xl tracking-tight hidden sm:block">Edgewater<span className="text-blue-600">Connect</span></span>
        </div>
        <div className="flex gap-6 font-semibold text-gray-600">
          <a href="#" className="hover:text-blue-600">Directory</a>
          <a href="#" className="hover:text-blue-600">Community</a>
          <a href="#" className="hover:text-blue-600">Events</a>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all text-sm"
        >
          Add Business
        </button>
      </nav>

      <div className="pt-16">
        <Header onSearch={setSearchTerm} />
        
        <FilterBar 
          activeCategory={selectedCategory} 
          onSelectCategory={(cat) => setSelectedCategory(cat)} 
        />

        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">
                {selectedCategory === Category.ALL ? 'Featured Businesses' : `${selectedCategory}s`}
              </h2>
              <p className="text-gray-500 font-medium">
                {isLoading ? 'Loading local data...' : `${filteredBusinesses.length} businesses found in Edgewater`}
              </p>
            </div>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="text-blue-600 font-bold hover:underline"
              >
                Clear Search Results
              </button>
            )}
          </div>

          {filteredBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : !isLoading && (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900">No businesses found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => { setSelectedCategory(Category.ALL); setSearchTerm(''); }}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-blue-700"
              >
                View All Businesses
              </button>
            </div>
          )}
        </main>
      </div>

      <AddBusinessModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddBusiness}
      />

      <Analytics />

      <footer className="bg-slate-900 text-white pt-16 pb-8 px-6 md:px-12 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-2xl">E</div>
              <span className="font-extrabold text-xl">Edgewater<span className="text-blue-400">Connect</span></span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Bringing the Edgewater community together by showcasing our unique local businesses and services.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Categories</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white">Fitness & Gyms</a></li>
              <li><a href="#" className="hover:text-white">Home Services</a></li>
              <li><a href="#" className="hover:text-white">Dining & Food</a></li>
              <li><a href="#" className="hover:text-white">Health & Beauty</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Community</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white">Local Events</a></li>
              <li><a href="#" className="hover:text-white">Town News</a></li>
              <li><a href="#" className="hover:text-white">Business Grants</a></li>
              <li><a href="#" className="hover:text-white">Volunteer</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Get the latest local updates delivered to your inbox.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-slate-800 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button className="bg-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2024 Edgewater Business Connect. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
