import { useState } from 'react';
import { createAuthor } from '../services/authors';

export default function AuthorForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAuthor({ name });
      setName('');
      onCreated();
    } catch (err) {
      console.error(err);
      alert('Failed to create author');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input
        type="text"
        placeholder="Author Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <button className="bg-blue-500 text-white rounded px-4 py-2" type="submit">
        Add Author
      </button>
    </form>
  );
}
