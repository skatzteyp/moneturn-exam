import { useEffect, useState } from 'react';
import { getBook, updateBook, deleteBook } from '../services/books';
import { getAuthors } from '../services/authors';

interface Book {
  id: number;
  title: string;
  authorId: number;
}

interface Author {
  id: number;
  name: string;
}

export default function BookDetail({ id, onBack }: { id: number; onBack: () => void }) {
  const [book, setBook] = useState<Book>({ id: 0, title: '', authorId: 0 });
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    fetchBook();
    fetchAuthors();
  }, []);

  const fetchBook = async () => {
    const data = await getBook(id);
    setBook({ id: data.id, title: data.title, authorId: data.authorId });
  };

  const fetchAuthors = async () => {
    const data = await getAuthors();
    setAuthors(data);
  };

  const handleUpdate = async () => {
    await updateBook(book.id, { title: book.title, authorId: book.authorId });
    onBack();
  };

  const handleDelete = async () => {
    await deleteBook(book.id);
    onBack();
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Edit Book</h2>
      <input
        type="text"
        value={book.title}
        onChange={(e) => setBook({ ...book, title: e.target.value })}
        className="border p-2 rounded w-full"
      />
      <select
        value={book.authorId}
        onChange={(e) => setBook({ ...book, authorId: Number(e.target.value) })}
        className="border p-2 rounded w-full"
      >
        {authors.map((author) => (
          <option key={author.id} value={author.id}>{author.name}</option>
        ))}
      </select>
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
