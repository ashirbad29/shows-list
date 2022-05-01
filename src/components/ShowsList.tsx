import ShowCard from '../components/ShowCard';

type ShowListType = {
  showList: Array<any>;
};

const ShowsList = ({ showList }: ShowListType) => {
  return (
    <>
      {showList && showList.length > 0 ? (
        <div className="flex flex-wrap justify-around sm:justify-start gap-x-4 gap-y-12 min-w-[520px]">
          {showList?.map((show: any) => (
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
        <div className="flex-1 flex items-center justify-center text-2xl">
          No Results Found!
        </div>
      )}
    </>
  );
};

export default ShowsList;
