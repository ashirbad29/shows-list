import { useState } from 'react';

import Filter from '../components/Filter';
import Navbar from '../components/Navbar';
import Paginate from '../components/Paginate';
import ShowsList from '../components/ShowsList';
import { useSearch } from '../services/index';
import { debounce } from '../utils/debounce';

const Search = () => {
  const [params, setParams] = useState({ page: 1, query: '' });
  const [showType, setShowType] = useState<'movie' | 'tv'>('movie');

  const { data: searchList, isLoading } = useSearch(showType, params.page, params.query);

  const debouncedSetQuery = debounce(([val]: string) => {
    setParams({ page: 1, query: val });
  }, 800);

  return (
    <main className="flex">
      <div className="container h-full">
        <Navbar onSearchInputChange={(val) => debouncedSetQuery(val)} />
        <section className="flex-1 flex flex-col overflow-y-auto overflow-x-scroll">
          {isLoading ? (
            <div className="flex flex-1 items-center justify-center">Loading...</div>
          ) : (
            <>
              <div className="flex-1 flex">
                <ShowsList showList={searchList?.results} type={showType} />
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
      </div>
      <Filter
        state={{
          type: showType,
        }}
        onTypeChange={(type) => {
          setShowType((show) => (type === 'movie' || type === 'tv' ? type : show));
          setParams((params) => ({ ...params, page: 1 }));
        }}
        disableGenre
        disableRating
        disableYear
        message={`Some filters can't be applied while Searching!`}
      />
    </main>
  );
};

export default Search;
