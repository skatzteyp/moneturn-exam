const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/authors';

interface AuthorPayload {
  name: string;
}

export async function getAuthors() {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) throw new Error('Failed to fetch authors');
  return res.json();
}

export async function getAuthor(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch author');
  return res.json();
}

export async function createAuthor(data: AuthorPayload) {
  const res = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create author');
  return res.json();
}

export async function updateAuthor(id: number, data: AuthorPayload) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update author');
  return res.json();
}

export async function deleteAuthor(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete author');
}
