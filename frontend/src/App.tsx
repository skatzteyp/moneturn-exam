import { useState } from 'react';
import Sidebar from './components/Sidebar';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import AddBook from './components/AddBook';
import AuthorList from './components/AuthorList';
import AuthorDetail from './components/AuthorDetail';
import AddAuthor from './components/AddAuthor';

export default function App() {
  const [selectedMenu, setSelectedMenu] = useState<'books' | 'authors'>('books');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);

  const reset = () => {
    setSelectedId(null);
    setAdding(false);
  };

  return (
    <div className="flex">
      <Sidebar selected={selectedMenu} onSelect={(menu) => { setSelectedMenu(menu as any); reset(); }} />
      <div className="flex-1 p-4 max-w-270">
        {selectedMenu === 'books' && (
          <>
            {adding ? (
              <AddBook onBack={reset} />
            ) : selectedId ? (
              <BookDetail id={selectedId} onBack={reset} />
            ) : (
              <BookList onSelect={(id) => setSelectedId(id)} onAdd={() => setAdding(true)} />
            )}
          </>
        )}
        {selectedMenu === 'authors' && (
          <>
            {adding ? (
              <AddAuthor onBack={reset} />
            ) : selectedId ? (
              <AuthorDetail id={selectedId} onBack={reset} />
            ) : (
              <AuthorList onSelect={(id) => setSelectedId(id)} onAdd={() => setAdding(true)} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
