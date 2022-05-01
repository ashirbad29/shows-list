import { useState } from 'react';

import Filter from '../components/Filter';
import Navbar from '../components/Navbar';
import Paginate from '../components/Paginate';
import ShowsList from '../components/ShowsList';
import { useGenres, useTopRatedList } from '../services/index';

type ParamsType = {
  page: number;
};

const TopRated = () => {
  const [params, setParams] = useState<ParamsType>({ page: 1 });
  const [showsType, setShowsType] = useState<'movie' | 'tv'>('movie');
  const { data: _genre } = useGenres(showsType);
  const { data: topRatedList, isLoading } = useTopRatedList(showsType, params);

  return (
    <main className="flex">
      <div className="container h-full">
        <Navbar />
        <section className="flex-1 flex flex-col overflow-y-auto overflow-x-scroll">
          {isLoading ? (
            <div className="flex flex-1 items-center justify-center">Loading...</div>
          ) : (
            <>
              <div className="flex-1 flex">
                <ShowsList showList={topRatedList?.results} type={showsType} />
              </div>
              {topRatedList?.results && topRatedList.results.length > 0 && (
                <div className="mb-14 mt-10 flex w-full justify-center">
                  <Paginate
                    onPageChange={(nextPage) =>
                      setParams((params) => ({ ...params, page: nextPage.selected + 1 }))
                    }
                    pageCount={topRatedList?.total_pages}
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
          type: showsType,
        }}
        onTypeChange={(type) => {
          setShowsType((show) => (type === 'movie' || type === 'tv' ? type : show));
          setParams((params) => ({ ...params, page: 1 }));
        }}
        disableGenre
        disableRating
        disableYear
        message={`Some filters can't be applied on Top Rated page`}
      />
    </main>
  );
};

export default TopRated;
