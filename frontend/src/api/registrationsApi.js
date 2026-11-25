const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5205').replace(/\/$/, '');

async function request(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

export async function getRegistrations({
  participantName = '',
  type = '',
  status = '',
  page = 1,
  pageSize = 10,
} = {}) {
  const params = new URLSearchParams({
    participantName,
    type,
    status,
    page: String(page),
    pageSize: String(pageSize),
  });

  return request(`/registrations?${params.toString()}`);
}

export async function getSummary() {
  return request('/registrations/summary');
}
