import { useState, useEffect } from 'react';
import { createBook } from '../services/books';
import { getAuthors } from '../services/authors';

interface Author {
  id: number;
  name: string;
}

export default function BookForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState<number>(0);
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const data = await getAuthors();
      setAuthors(data);
      if (data.length > 0) setAuthorId(data[0].id);
    };
    fetchAuthors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBook({ title, authorId });
      setTitle('');
      onCreated();
    } catch (err) {
      console.error(err);
      alert('Failed to create book');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <select
        value={authorId}
        onChange={(e) => setAuthorId(Number(e.target.value))}
        className="border rounded p-2 w-full"
      >
        {authors.map((author) => (
          <option key={author.id} value={author.id}>{author.name}</option>
        ))}
      </select>
      <button className="bg-green-500 text-white rounded px-4 py-2" type="submit">
        Add Book
      </button>
    </form>
  );
}
