const API_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === 'production' ? 'https://alok-o4t4.vercel.app' : 'http://127.0.0.1:4000');

/**
 * Core fetch wrapper with auth support
 */
type ApiFetchOptions = RequestInit & {
  skipToken?: boolean;
};

export async function apiFetch(endpoint: string, options: ApiFetchOptions = {}) {
  const token = typeof window !== 'undefined' && !options?.skipToken ? localStorage.getItem('token') : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let res;
  try {
    res = await fetch(`${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`, {
      ...options,
      headers,
    });
  } catch (error: any) {
    console.error(`[apiFetch NETWORK ERROR] url: ${API_URL}${endpoint}, message:`, error.message);
    // Return a graceful dummy failure object to prevent SSG compiler crashes
    return null; 
  }

  if (!res.ok) {
    if (res.status === 401 && typeof window !== 'undefined') {
      if (!endpoint.includes('/auth/login')) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }
    }
    const errorData = await res.json().catch(() => ({}));
    console.error(`[apiFetch ERROR] url: ${API_URL}${endpoint}, status: ${res.status}, body:`, errorData);
    throw new Error(errorData.message || `API Error: ${res.status}`);
  }

  return res.json();
}

/**
 * CMS Specific API Helpers
 */
export async function getHomePage() {
  try {
    return await apiFetch('/home-page');
  } catch (error) {
    return null;
  }
}

export async function getPageData(slug: string) {
  try {
    const res = await fetch(`${API_URL}/pages/public/${slug}`, {
      next: { revalidate: 60 }, // Revalidate every minute
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      console.error(`Failed to fetch page data (${slug}): ${res.status}`);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error(`Network or fetch error for page (${slug}):`, error);
    return null; // Return null gracefully to prevent Vercel Build crashes
  }
}

export async function getAllPages() {
  return apiFetch('/pages');
}

export async function updatePageContent(id: string, data: any) {
  return apiFetch(`/pages/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function getContactPage() {
  return apiFetch('/api/contact-page');
}

export async function submitContactForm(data: any) {
  return apiFetch('/api/contact-submit', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
export async function getMedia() {
  return apiFetch('/api/public/media');
}
