import ShowCard from '../components/ShowCard';

type ShowListType = {
  showList: Array<any>;
};

const ShowsList = ({ showList }: ShowListType) => {
  return (
    <>
      {showList && showList.length > 0 ? (
        <div className="flex flex-wrap mt-10 justify-around sm:justify-start gap-x-4 gap-y-12">
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
        <div className="flex-1 flex items-center justify-center">No Results Found!</div>
      )}
    </>
  );
};

export default ShowsList;
