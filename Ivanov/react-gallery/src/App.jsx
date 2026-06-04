import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Gallery from './components/Gallery/Gallery';
import Pagination from './components/Pagination/Pagination';
import FilterModal from './components/FilterModal/FilterModal';

const ITEMS_PER_PAGE = 6;

function App() {
  const [allPaintings, setAllPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    artist: '',
    location: '',
    yearFrom: '',
    yearTo: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const API = 'https://corsproxy.io/?' + encodeURIComponent("https://registry.scalar.com/@mail-ufgwz/apis/gallery-api@latest");
        const response = await fetch(API);
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        const data = await response.json();

        let paintings = null;

        
        if (Array.isArray(data)) {
          paintings = data;
        }
        
        else if (data?.paths?.['/paintings']?.get?.responses?.['200']?.content?.['application/json']?.example) {
          paintings = data.paths['/paintings'].get.responses['200'].content['application/json'].example;
        }
        
        else if (typeof data === 'object') {
          const keys = Object.keys(data);
          for (let key of keys) {
            if (Array.isArray(data[key])) {
              paintings = data[key];
              break;
            }
          }
        }

        if (!paintings || !Array.isArray(paintings)) {
          throw new Error('Не удалось найти массив картин в ответе сервера');
        }

        setAllPaintings(paintings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPaintings();
  }, []);

  const filteredPaintings = useMemo(() => {
    if (!Array.isArray(allPaintings)) return [];
    return allPaintings.filter(painting => {
      const matchTitle = painting.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchArtist = !filters.artist || painting.artist === filters.artist;
      const matchLocation = !filters.location || painting.location === filters.location;
      const year = painting.year;
      const matchYearFrom = !filters.yearFrom || year >= parseInt(filters.yearFrom);
      const matchYearTo = !filters.yearTo || year <= parseInt(filters.yearTo);
      return matchTitle && matchArtist && matchLocation && matchYearFrom && matchYearTo;
    });
  }, [allPaintings, searchQuery, filters]);

  const totalPages = Math.ceil(filteredPaintings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPaintings = filteredPaintings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  return (
    <>
      <Header />
      <main>
        <Search
          onOpenFilter={() => setModalOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        {loading ? (
          <div className="container">Загрузка...</div>
        ) : error ? (
          <div className="container">Ошибка: {error}</div>
        ) : (
          <>
            <Gallery paintings={currentPaintings} searchQuery={searchQuery} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        filters={filters}
        onFilterChange={setFilters}



/>
    </>
  );
}

export default App;