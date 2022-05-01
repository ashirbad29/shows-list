import { useState } from 'react';

import Filter from '../components/Filter';
import Navbar from '../components/Navbar';
import Paginate from '../components/Paginate';
import ShowsList from '../components/ShowsList';
import { useNewestShows } from '../services/index';

type ParamsType = {
  page: number;
  with_genres?: string;
  'vote_average.lte'?: number;
};
const Newest = () => {
  const [params, setParams] = useState<ParamsType>({ page: 1 });
  const [showsType, setShowsType] = useState<'movie' | 'tv'>('movie');
  const { data: newestList, isLoading } = useNewestShows(showsType, params);

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
                <ShowsList showList={newestList?.results} type={showsType} />
              </div>
              {newestList?.results && newestList.results.length > 0 && (
                <div className="mb-14 mt-10 flex w-full justify-center">
                  <Paginate
                    onPageChange={(nextPage) =>
                      setParams((params) => ({ ...params, page: nextPage.selected + 1 }))
                    }
                    pageCount={newestList?.total_pages}
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
          genre: params.with_genres,
          rating: Math.round((params['vote_average.lte'] || 0) / 2),
        }}
        onGenreChange={(genre) =>
          setParams((param) => ({ ...param, with_genres: genre, page: 1 }))
        }
        onTypeChange={(type) => {
          setShowsType((show) => (type === 'movie' || type === 'tv' ? type : show));
          setParams((params) => ({ ...params, page: 1 }));
        }}
        onRatingChange={(val) =>
          setParams((params) => ({ ...params, 'vote_average.lte': val, page: 1 }))
        }
        disableYear
        message={`You can't use filter by years in Newest page`}
      />
    </main>
  );
};

export default Newest;
