import { useState } from 'react';

import Navbar from '../components/Navbar';
import ShowsList from '../components/ShowsList';
import { useSearch } from '../services/index';
import { debounce } from '../utils/debounce';

const Search = () => {
  const [query, setQuery] = useState('');
  const debouncedSetQuery = debounce(([val]: string) => {
    setQuery(val);
  }, 800);

  const { data: searchList, isLoading } = useSearch('movie', { query, page: 1 });

  return (
    <main className="container h-full flex flex-col">
      <Navbar onSearchInputChange={(val) => debouncedSetQuery(val)} />
      <section className="flex flex-col flex-1">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">Loading...</div>
        ) : (
          <ShowsList showList={searchList?.results || []} />
        )}
      </section>
    </main>
  );
};

export default Search;
