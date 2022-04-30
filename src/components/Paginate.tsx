import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

import { ChevronLeft, ChevronRight } from '../assets/icons';

const Paginate = (props: ReactPaginateProps) => {
  return (
    <ReactPaginate
      previousLabel={<PaginationBtn which="prev" />}
      nextLabel={<PaginationBtn which="next" />}
      breakLabel=". . ."
      breakLinkClassName="text-2xl text-blue-500"
      pageLinkClassName="px-3 py-1 rounded cursor-pointer bg-gray-900"
      activeLinkClassName="ring-1 ring-blue-500 !border-none text-blue-light"
      className="flex items-center gap-3 text-blue-light/70"
      pageRangeDisplayed={1}
      marginPagesDisplayed={2}
      disabledClassName="opacity-30 !cursor-not-allowed"
      {...props}
    />
  );
};

export const PaginationBtn = ({
  className,
  which,
}: {
  className?: string;
  which: 'prev' | 'next';
}) => {
  return (
    <button className={`rounded bg-gray-900 p-[3px] ${className && className}`}>
      {which === 'prev' ? (
        <ChevronLeft className="h-6 w-6" />
      ) : (
        <ChevronRight className="h-6 w-6" />
      )}
    </button>
  );
};

export default Paginate;
