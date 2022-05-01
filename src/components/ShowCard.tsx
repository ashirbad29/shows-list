import Image from '../components/Image';
import { useGenres } from '../services';
import { getImagePath } from '../utils';

type ShowCardType = {
  title: string;
  imageUrl: string;
  genre_ids: Array<string>;
  release_date: string | null;
  genreType: 'movie' | 'tv';
};

const ShowCard = (props: ShowCardType) => {
  const { title, imageUrl, genre_ids, release_date, genreType } = props;
  const { data: genres } = useGenres(genreType);

  return (
    <div className="flex flex-col items-center max-w-[200px]">
      <div className="w-full">
        <Image className="object-contain shadow-xl" src={getImagePath(imageUrl)} />
      </div>
      <span className="font-semibold  text-blue-500 mt-2 w-full text-center">
        {title}
      </span>
      <div className="text-center text-gray-400 font-semibold">
        {genres &&
          genres
            .filter((genre: any) => genre_ids.includes(genre.id))
            .map((genre: any) => genre.name)
            .join(', ')}
      </div>
      {release_date && (
        <span className="text-gray-400 font-semibold">
          {new Date(release_date).getFullYear()}
        </span>
      )}
    </div>
  );
};

export default ShowCard;
