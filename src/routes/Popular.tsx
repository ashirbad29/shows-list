import { useState } from 'react';

import Filter from '../components/Filter';
import Navbar from '../components/Navbar';
import Paginate from '../components/Paginate';
import ShowsList from '../components/ShowsList';
import { useGenres, usePopularList } from '../services/index';

export type ParamsType = {
  page: number;
  with_genres?: string;
  'primary_release_date.gte'?: string;
  'primary_release_date.lte'?: string;
  'first_air_date.gte'?: string;
  'first_air_date.lte'?: string;
  'vote_average.lte'?: number;
};

const Popular = () => {
  const [params, setParams] = useState<ParamsType>({ page: 1 });
  const [showType, setShowType] = useState<'movie' | 'tv'>('movie');
  const { data: _genre } = useGenres(showType);
  const { data: popularList, isLoading } = usePopularList(showType, params);

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
                <ShowsList showList={popularList?.results} type={showType} />
              </div>
              {popularList?.results && popularList.results.length > 0 && (
                <div className="mb-14 mt-10 flex w-full justify-center">
                  <Paginate
                    onPageChange={(nextPage) =>
                      setParams((params) => ({ ...params, page: nextPage.selected + 1 }))
                    }
                    pageCount={popularList?.total_pages}
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
          genre: params.with_genres,
          year: {
            start:
              showType === 'movie'
                ? params['primary_release_date.gte']
                : params['first_air_date.gte'],
            end:
              showType === 'movie'
                ? params['primary_release_date.lte']
                : params['first_air_date.lte'],
          },
          rating: Math.round((params['vote_average.lte'] || 0) / 2),
        }}
        onGenreChange={(genre) =>
          setParams((param) => ({ ...param, with_genres: genre, page: 1 }))
        }
        onTypeChange={(type) => {
          setShowType((show) => (type === 'movie' || type === 'tv' ? type : show));
          const {
            'first_air_date.gte': _,
            'first_air_date.lte': __,
            'primary_release_date.gte': ___,
            'primary_release_date.lte': ____,
            ...rest
          } = params;
          setParams({ ...rest, page: 1 });
        }}
        onFromYearChange={(year) => {
          const { 'first_air_date.gte': _, 'primary_release_date.gte': __ } = params;
          if (showType === 'tv') {
            setParams({ ...params, 'first_air_date.gte': `${year}-01-01`, page: 1 });
          } else {
            setParams({
              ...params,
              'primary_release_date.gte': `${year}-01-01`,
              page: 1,
            });
          }
        }}
        onToYearChange={(year) => {
          const { 'first_air_date.lte': _, 'primary_release_date.lte': __ } = params;
          if (showType === 'tv') {
            setParams({ ...params, 'first_air_date.lte': `${year}-12-31`, page: 1 });
          } else {
            setParams({
              ...params,
              'primary_release_date.lte': `${year}-12-31`,
              page: 1,
            });
          }
        }}
        onRatingChange={(val) =>
          setParams((params) => ({ ...params, 'vote_average.lte': val, page: 1 }))
        }
      />
    </main>
  );
};

export default Popular;
