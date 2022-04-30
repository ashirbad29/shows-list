import Navbar from '../components/Navbar';
import ShowCard from '../components/ShowCard';
import { useGenres, useTopRatedList } from '../services/index';

const TopRated = () => {
  const { data: _genre } = useGenres('movie');
  const { data: topRatedList, isLoading } = useTopRatedList('movie');

  return (
    <main className="container h-full">
      <Navbar />
      <section className="flex flex-col">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {topRatedList?.results && topRatedList.results.length > 0 ? (
              <div className="flex flex-wrap mt-10 justify-around sm:justify-start gap-x-4 gap-y-12">
                {topRatedList.results.map((show: any) => (
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

export default TopRated;
