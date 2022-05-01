import { useState } from 'react';

import Filter from '../components/Filter';
import Navbar from '../components/Navbar';
import Paginate from '../components/Paginate';
import ShowsList from '../components/ShowsList';
import { useTrendingShows } from '../services/index';

type ParamsType = {
  page: number;
};

const TopRated = () => {
  const [params, setParams] = useState<ParamsType>({ page: 1 });
  const [showType, setShowType] = useState<'movie' | 'tv'>('movie');
  const { data: trendingList, isLoading } = useTrendingShows(showType, params);

  return (
    <main className="flex">
      <div className="container h-full">
        <Navbar />
        <section className="flex-1 flex flex-col overflow-y-auto scroll-bar">
          {isLoading ? (
            <div className="flex flex-1 items-center justify-center">Loading...</div>
          ) : (
            <>
              <div className="flex-1 flex">
                <ShowsList showList={trendingList?.results} type={showType} />
              </div>
              {trendingList?.results && trendingList.results.length > 0 && (
                <div className="mb-14 mt-10 flex w-full justify-center">
                  <Paginate
                    onPageChange={(nextPage) =>
                      setParams((params) => ({ ...params, page: nextPage.selected + 1 }))
                    }
                    pageCount={trendingList?.total_pages}
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
        message={`Some filters can't be applied on Trending page`}
      />
    </main>
  );
};

export default TopRated;
