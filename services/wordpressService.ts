
import { Business, Category } from '../types';

/**
 * In a real WordPress environment, 'wpApiSettings' is localized via wp_localize_script
 */
declare var wpApiSettings: { root: string; nonce: string } | undefined;

export const fetchBusinessesFromWP = async (): Promise<Business[]> => {
  try {
    const root = typeof wpApiSettings !== 'undefined' ? wpApiSettings.root : '';
    // Fetching from the standard WP REST API for a custom post type 'business'
    const response = await fetch(`${root}/wp/v2/business?_embed`);
    
    if (!response.ok) throw new Error('WP API not available');
    
    const data = await response.json();
    
    return data.map((post: any) => ({
      id: post.id.toString(),
      name: post.title.rendered,
      category: post.business_category || Category.RESTAURANT,
      description: post.excerpt.rendered.replace(/<[^>]*>?/gm, ''),
      address: post.meta?.address || 'Edgewater, MD',
      phone: post.meta?.phone || '',
      rating: parseFloat(post.meta?.rating) || 5.0,
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://picsum.photos/seed/wp/400/300'
    }));
  } catch (error) {
    console.warn("WordPress REST API not found, falling back to mock data.");
    return [];
  }
};

export const saveBusinessToWP = async (business: Business): Promise<boolean> => {
  if (typeof wpApiSettings === 'undefined') return false;

  try {
    const response = await fetch(`${wpApiSettings.root}/wp/v2/business`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': wpApiSettings.nonce,
      },
      body: JSON.stringify({
        title: business.name,
        content: business.description,
        status: 'pending', // Moderate new submissions
        meta: {
          address: business.address,
          phone: business.phone,
          rating: business.rating,
          category: business.category
        }
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Error saving to WP:", error);
    return false;
  }
};
