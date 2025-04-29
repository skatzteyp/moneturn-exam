import { useState } from 'react';
import { createAuthor } from '../services/authors';

export default function AddAuthor({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState('');

  const handleCreate = async () => {
    await createAuthor({ name });
    onBack();
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Add New Author</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Author Name"
        className="border p-2 rounded w-full"
      />
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
