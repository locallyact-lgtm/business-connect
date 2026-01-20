
import React from 'react';
import { Category } from '../types';
import { BUSINESS_CATEGORIES } from '../constants';

interface FilterBarProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 py-4 shadow-sm overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
        {BUSINESS_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`whitespace-nowrap px-6 py-2 rounded-full font-semibold transition-all duration-300 border-2 ${
              activeCategory === cat
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                : 'bg-white border-transparent text-gray-600 hover:border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
