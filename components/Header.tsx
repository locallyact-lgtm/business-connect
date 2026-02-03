
import React, { useState, useEffect } from 'react';
import { generateHeaderImage } from '../services/geminiService';

interface HeaderProps {
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  // Default high-quality community image for Edgewater/Maryland feel
  const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2000';
  
  const [bgImage, setBgImage] = useState<string>(DEFAULT_IMAGE);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Safely check for API key to prevent runtime crashes in production environments
    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
    const hasApiKey = !!apiKey && apiKey !== "undefined";
    
    if (hasApiKey) {
      const loadHeader = async () => {
        setLoading(true);
        const img = await generateHeaderImage();
        if (img) {
          setBgImage(img);
        }
        setLoading(false);
      };
      loadHeader();
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${loading ? 'opacity-30 scale-110' : 'opacity-100 scale-100'}`}
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-900/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-block mb-4 px-4 py-1.5 bg-blue-600/20 backdrop-blur-md border border-blue-400/30 rounded-full text-blue-300 text-sm font-bold tracking-wide uppercase">
          Edgewater's Premier Business Directory
        </div>
        <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl leading-tight">
          Find Trusted Services in <span className="text-yellow-400">Maryland</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 font-medium max-w-2xl mx-auto">
          From local cafes to expert contractors, find everything you need right here in Edgewater.
        </p>

        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 bg-white/10 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-white/20">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search for plumbers, gyms, dentists..."
              className="w-full pl-12 pr-6 py-4 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-black px-10 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-xl"
          >
            Search Now
          </button>
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="text-white/60 text-sm font-bold uppercase tracking-widest w-full mb-2">Popular Searches:</span>
          {['Restaurants', 'Contractors', 'Hair Salons', 'Health'].map((tag) => (
            <button 
              key={tag}
              onClick={() => onSearch(tag)}
              className="text-xs font-bold text-white bg-white/10 px-4 py-2 rounded-lg border border-white/10 hover:bg-yellow-400 hover:text-slate-900 hover:border-yellow-400 transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin shadow-2xl"></div>
            <p className="text-white text-lg font-bold tracking-wide animate-pulse">Personalizing your view...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
