import { useGenres } from '../services/index';
import { getYearsDropdownList } from '../utils';
import SelectInput from './SelectInput';
import StarRatingPicker from './StarRatingPicker';

type YearType = { start?: string | number; end?: string | number };

type FilterState = {
  type: 'movie' | 'tv';
  genre?: string;
  year?: YearType;
  rating?: number;
};

type FilterProps = {
  state: FilterState;
  disableGenre?: boolean;
  disableRating?: boolean;
  disableYear?: boolean;
  message?: string;
  onFromYearChange?: (_year: string | number) => void;
  onToYearChange?: (_year: string | number) => void;
  onTypeChange?: (_type: string) => void;
  onRatingChange?: (_rating: number) => void;
  onGenreChange?: (_genre: string) => void;
};

const type_select_data = [
  {
    id: 'movie',
    label: 'Movies',
  },
  {
    id: 'tv',
    label: 'TV Shows',
  },
];

const getYearFromDate = (date: string) => {
  return new Date(date).getFullYear().toString();
};

const Filter = (props: FilterProps) => {
  const {
    state,
    onFromYearChange,
    onToYearChange,
    onGenreChange,
    onTypeChange,
    onRatingChange,
    disableGenre = false,
    disableRating = false,
    disableYear = false,
    message,
  } = props;
  const { data: genres } = useGenres(state.type);

  return (
    <section className="bg-gray-900/50 right-0 top-0 bottom-0 w-96 pt-9 px-6 shadow-filter">
      <span className="text-gray-400 font-medium">DISCOVER OPTIONS</span>
      <SelectInput
        label="Type"
        options={type_select_data}
        text={type_select_data.find((d) => d.id === state?.type)?.label || 'Select Type'}
        className="border-2 border-gray-500/20"
        wrapperClassName="mt-8"
        onChangeValue={(val) => onTypeChange && onTypeChange(val)}
      />

      <SelectInput
        label="Genre"
        options={genres?.map((genre: any) => ({ id: genre.id, label: genre.name })) || []}
        text={
          genres?.find((genre: any) => genre.id === state?.genre)?.name || 'Select Type'
        }
        className="border-2 border-gray-500/20"
        wrapperClassName="mt-8"
        onChangeValue={(val) => onGenreChange && onGenreChange(val)}
        disabled={disableGenre}
      />

      <div className="flex space-x-3">
        <SelectInput
          label="Year"
          options={getYearsDropdownList()}
          text={
            (state?.year?.start?.toString() &&
              getYearFromDate(state?.year?.start?.toString())) ||
            'From'
          }
          className="border-2 border-gray-500/20"
          wrapperClassName="mt-8 flex-1"
          onChangeValue={(val) => onFromYearChange && onFromYearChange(val)}
          disabled={disableYear}
        />
        <SelectInput
          label="Genre"
          hideLabel
          options={getYearsDropdownList()}
          text={
            (state?.year?.end?.toString() &&
              getYearFromDate(state?.year?.end?.toString())) ||
            'To'
          }
          className="border-2 border-gray-500/20"
          wrapperClassName="mt-8 flex justify-end flex-col flex-1"
          onChangeValue={(val) => onToYearChange && onToYearChange(val)}
          disabled={disableYear}
        />
      </div>

      <div>
        <StarRatingPicker
          label="Rating"
          value={state.rating || null}
          onChange={(val) => onRatingChange && onRatingChange(val * 2)}
          wrapperClassName="mt-8"
          disabled={disableRating}
        />
      </div>
      {message && <p className="mt-6 text-blue-400">{message}</p>}
    </section>
  );
};

export default Filter;
