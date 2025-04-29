import { useEffect, useState } from 'react';
import { createBook } from '../services/books';
import { getAuthors } from '../services/authors';

interface Author {
  id: number;
  name: string;
}

export default function AddBook({ onBack }: { onBack: () => void }) {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState<number>(0);
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    const data = await getAuthors();
    setAuthors(data);
    if (data.length > 0) setAuthorId(data[0].id);
  };

  const handleCreate = async () => {
    await createBook({ title, authorId });
    onBack();
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Add New Book</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Book Title"
        className="border p-2 rounded w-full"
      />
      <select
        value={authorId}
        onChange={(e) => setAuthorId(Number(e.target.value))}
        className="border p-2 rounded w-full"
      >
        {authors.map((author) => (
          <option key={author.id} value={author.id}>{author.name}</option>
        ))}
      </select>
      <div className="flex space-x-4">
        <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded">
          Create
        </button>
        <button onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">
          Back
        </button>
      </div>
    </div>
  );
}
