import Navbar from '../components/Navbar';
import ShowsList from '../components/ShowsList';
import { useNewestShows } from '../services/index';

const Newest = () => {
  const { data: newestList, isLoading } = useNewestShows('movie');

  return (
    <main className="container h-full">
      <Navbar />
      <section className="flex flex-col flex-1">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">Loading...</div>
        ) : (
          <ShowsList showList={newestList?.results || []} />
        )}
      </section>
    </main>
  );
};

export default Newest;
