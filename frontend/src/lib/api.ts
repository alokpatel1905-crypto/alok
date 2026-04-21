const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

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

  const res = await fetch(`${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`, {
    ...options,
    headers,
  });

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
export async function getPageData(slug: string) {
  const res = await fetch(`${API_URL}/pages/public/${slug}`, {
    next: { revalidate: 60 }, // Revalidate every minute
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch page data');
  }

  return res.json();
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
