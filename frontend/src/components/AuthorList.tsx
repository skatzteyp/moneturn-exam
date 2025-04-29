import { useEffect, useState } from 'react';
import { getAuthors } from '../services/authors';

interface Author {
  id: number;
  name: string;
}

export default function AuthorList({ onSelect, onAdd }: { onSelect: (id: number) => void; onAdd: () => void }) {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    const data = await getAuthors();
    setAuthors(data);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Authors</h2>
        <button onClick={onAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Author
        </button>
      </div>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onSelect(author.id)}>
              <td className="border px-4 py-2">{author.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
