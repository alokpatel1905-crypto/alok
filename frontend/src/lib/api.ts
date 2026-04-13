const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://alok-o4t4.vercel.app';

export async function apiFetch(
  endpoint: string,
  options: RequestInit & { skipToken?: boolean } = {},
) {
  const { skipToken, ...fetchOptions } = options;
  const token = !skipToken && typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers: {
      ...(!fetchOptions.body || !(fetchOptions.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...fetchOptions.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'API Error');
  }

  return res.json();
}

// ==== CMS Helpers ====

export async function getPageContent(slug: string) {
  try {
    return await apiFetch(`/pages/public/${slug}`, { skipToken: true });
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

export async function getAllPages() {
  return apiFetch('/pages');
}

export async function updatePageContent(id: string, payload: any) {
  return apiFetch(`/pages/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function getPageHistory(id: string) {
  return apiFetch(`/pages/${id}/history`);
}