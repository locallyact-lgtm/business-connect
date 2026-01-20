
import React from 'react';
import { Business } from '../types';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={business.image} 
          alt={business.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full font-bold text-sm shadow-md">
          ⭐ {business.rating}
        </div>
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-lg font-semibold text-xs uppercase tracking-wider shadow-sm">
          {business.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {business.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {business.description}
        </p>
        
        <div className="mt-auto space-y-2">
          <div className="flex items-start gap-2 text-gray-500 text-sm">
            <svg className="w-4 h-4 mt-0.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{business.address}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{business.phone}</span>
          </div>
        </div>

        <button className="mt-6 w-full py-3 bg-gray-50 hover:bg-blue-600 hover:text-white text-blue-600 font-bold rounded-xl transition-all duration-300">
          View Details
        </button>
      </div>
    </div>
  );
};

export default BusinessCard;
