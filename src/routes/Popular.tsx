import Navbar from '../components/Navbar';
import ShowCard from '../components/ShowCard';
import { useGenres, usePopularList } from '../services/index';

const Popular = () => {
  const { data: _genre } = useGenres('movie');
  const { data: popularList, isLoading } = usePopularList('movie');

  console.log(popularList);

  return (
    <main className="container h-full">
      <Navbar />
      <section className="flex flex-col">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {popularList.results && popularList.results.length > 0 ? (
              <div className="flex flex-wrap mt-10 justify-around sm:justify-start gap-x-4 gap-y-12">
                {popularList.results.map((show: any) => (
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
              <div>List is empty</div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Popular;
