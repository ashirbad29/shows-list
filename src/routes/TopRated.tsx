import { useState } from 'react';

import Navbar from '../components/Navbar';
import Paginate from '../components/Paginate';
import ShowsList from '../components/ShowsList';
import { useGenres, useTopRatedList } from '../services/index';

type ParamsType = {
  page: number;
};

const TopRated = () => {
  const [params, setParams] = useState<ParamsType>({ page: 1 });
  const { data: _genre } = useGenres('movie');
  const { data: topRatedList, isLoading } = useTopRatedList('movie', params);

  return (
    <main className="container h-full">
      <Navbar />
      <section className="flex flex-1 flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">Loading...</div>
        ) : (
          <>
            <div className="flex-1">
              <ShowsList showList={topRatedList?.results || []} />
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
    </main>
  );
};

export default TopRated;
