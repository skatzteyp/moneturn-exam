import { useEffect, useState } from 'react';
import { getBooks } from '../services/books';

interface Book {
  id: number;
  title: string;
  author: { name: string };
}

export default function BookList({ onSelect, onAdd }: { onSelect: (id: number) => void; onAdd: () => void }) {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Books</h2>
        <button onClick={onAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Book
        </button>
      </div>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Author</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onSelect(book.id)}>
              <td className="border px-4 py-2">{book.title}</td>
              <td className="border px-4 py-2">{book.author?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
