import { useState } from 'react';

import Navbar from '../components/Navbar';
import ShowCard from '../components/ShowCard';
import { useSearch } from '../services/index';
import { debounce } from '../utils/debounce';

const Search = () => {
  const [query, setQuery] = useState('');
  const debouncedSetQuery = debounce(([val]: string) => {
    setQuery(val);
  }, 800);

  const { data: searchList, isLoading } = useSearch('movie', { query, page: 1 });

  return (
    <main className="container h-full">
      <Navbar onSearchInputChange={(val) => debouncedSetQuery(val)} />
      <section className="flex flex-col">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {searchList?.results && searchList.results.length > 0 ? (
              <div className="flex flex-wrap mt-10 justify-around sm:justify-start gap-x-4 gap-y-12">
                {searchList?.results.map((show: any) => (
                  <ShowCard
                    key={show.id}
                    title={show.title}
                    imageUrl={show.poster_path}
                    genre_ids={show.genre_ids}
                    release_date={show.release_date}
                  />
                ))}
              </div>
            ) : (
              <div>No Results Found!</div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Search;
