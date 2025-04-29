import { useEffect, useState } from 'react';
import { getAuthor, updateAuthor, deleteAuthor } from '../services/authors';

interface Author {
  id: number;
  name: string;
}

export default function AuthorDetail({ id, onBack }: { id: number; onBack: () => void }) {
  const [author, setAuthor] = useState<Author>({ id: 0, name: '' });

  useEffect(() => {
    fetchAuthor();
  }, []);

  const fetchAuthor = async () => {
    const data = await getAuthor(id);
    setAuthor({ id: data.id, name: data.name });
  };

  const handleUpdate = async () => {
    await updateAuthor(author.id, { name: author.name });
    onBack();
  };

  const handleDelete = async () => {
    await deleteAuthor(author.id);
    onBack();
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Edit Author</h2>
      <input
        type="text"
        value={author.name}
        onChange={(e) => setAuthor({ ...author, name: e.target.value })}
        className="border p-2 rounded w-full"
      />
      <div className="flex space-x-4">
        <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">
          Save
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
          Delete
        </button>
        <button onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">
          Back
        </button>
      </div>
    </div>
  );
}
