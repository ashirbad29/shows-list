import Navbar from '../components/Navbar';
import ShowsList from '../components/ShowsList';
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
          <ShowsList showList={topRatedList?.results || []} />
        )}
      </section>
    </main>
  );
};

export default TopRated;
