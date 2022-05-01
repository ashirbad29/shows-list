import { useState } from 'react';

import Navbar from '../components/Navbar';
import Paginate from '../components/Paginate';
import ShowsList from '../components/ShowsList';
import { useSearch } from '../services/index';
import { debounce } from '../utils/debounce';

const Search = () => {
  const [params, setParams] = useState({ page: 1, query: '' });

  const { data: searchList, isLoading } = useSearch('movie', params.page, params.query);

  const debouncedSetQuery = debounce(([val]: string) => {
    setParams({ page: 1, query: val });
  }, 800);

  return (
    <main className="container h-full">
      <Navbar onSearchInputChange={(val) => debouncedSetQuery(val)} />
      <section className="flex flex-col flex-1">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">Loading...</div>
        ) : (
          <>
            <div className="flex flex-col flex-1">
              <ShowsList showList={searchList?.results || []} />
            </div>
            {searchList?.results && searchList.results.length > 0 && (
              <div className="mb-14 mt-10 flex w-full justify-center">
                <Paginate
                  onPageChange={(nextPage) =>
                    setParams((params) => ({ ...params, page: nextPage.selected + 1 }))
                  }
                  pageCount={searchList?.total_pages}
                  forcePage={params.page - 1 || 0}
                  pageRangeDisplayed={1}
                  marginPagesDisplayed={2}
                />
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Search;
