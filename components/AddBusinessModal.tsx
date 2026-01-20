
import React, { useState } from 'react';
import { Category, Business } from '../types';
import { BUSINESS_CATEGORIES } from '../constants';

interface AddBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (business: Business) => void;
}

interface FormErrors {
  name?: string;
  category?: string;
  address?: string;
  phone?: string;
  description?: string;
  image?: string;
}

const AddBusinessModal: React.FC<AddBusinessModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '' as Category,
    address: '',
    phone: '',
    description: '',
    image: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Business name is required';
    else if (formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters';

    if (!formData.category || formData.category === Category.ALL) {
      newErrors.category = 'Please select a valid business category';
    }

    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Format must be (XXX) XXX-XXXX';

    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.length < 10) newErrors.description = 'Description must be at least 10 characters';

    const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i;
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    else if (!formData.image.startsWith('http')) newErrors.image = 'Must be a valid URL starting with http/https';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        const newBusiness: Business = {
          ...formData,
          id: Date.now().toString(),
          rating: 5.0, // New businesses start with 5.0
        };
        onAdd(newBusiness);
        setIsSubmitting(false);
        onClose();
        setFormData({ name: '', category: '' as Category, address: '', phone: '', description: '', image: '' });
        setErrors({});
      }, 600);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Add Your Business</h2>
            <p className="text-sm text-gray-500">List your services for the Edgewater community.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Business Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Edgewater Cafe"
                className={`w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 ${errors.name ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-50'}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Category*</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 ${errors.category ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-50'}`}
              >
                <option value="">Select a category</option>
                {BUSINESS_CATEGORIES.filter(c => c !== Category.ALL).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1 font-medium">{errors.category}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Street Address*</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Full address in Edgewater, MD"
              className={`w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 ${errors.address ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-50'}`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1 font-medium">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number*</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(410) 555-0000"
              className={`w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 ${errors.phone ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-50'}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Tell us what makes your business special..."
              className={`w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 ${errors.description ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-50'}`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1 font-medium">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Image URL*</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={`w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 ${errors.image ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-50'}`}
            />
            {errors.image && <p className="text-red-500 text-xs mt-1 font-medium">{errors.image}</p>}
            <p className="text-[10px] text-gray-400 mt-2">Recommended: High resolution 400x300 image link.</p>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 border-2 border-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white font-bold rounded-xl px-6 py-4 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                'Add Business'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBusinessModal;
