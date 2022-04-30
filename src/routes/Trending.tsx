import Navbar from '../components/Navbar';
import ShowsList from '../components/ShowsList';
import { useTrendingShows } from '../services/index';

const TopRated = () => {
  const { data: trendingList, isLoading } = useTrendingShows('movie');

  return (
    <main className="container h-full">
      <Navbar />
      <section className="flex flex-col">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ShowsList showList={trendingList?.results || []} />
        )}
      </section>
    </main>
  );
};

export default TopRated;
