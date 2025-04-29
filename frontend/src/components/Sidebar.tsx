export default function Sidebar({ selected, onSelect }: { selected: string; onSelect: (menu: string) => void }) {
  return (
    <div className="bg-gray-800 text-white w-60 h-screen flex flex-col p-4 space-y-4">
      <button
        className={`text-left ${selected === 'books' ? 'font-bold' : ''}`}
        onClick={() => onSelect('books')}
      >
        Books
      </button>
      <button
        className={`text-left ${selected === 'authors' ? 'font-bold' : ''}`}
        onClick={() => onSelect('authors')}
      >
        Authors
      </button>
    </div>
  );
}
