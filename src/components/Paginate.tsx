import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

import { ChevronLeft, ChevronRight } from '../assets/icons';

const Paginate = (props: ReactPaginateProps) => {
  return (
    <ReactPaginate
      previousLabel={<PaginationBtn which="prev" />}
      nextLabel={<PaginationBtn which="next" />}
      breakLabel=". . ."
      breakLinkClassName="text-2xl text-blue-500"
      pageLinkClassName="px-3 py-1 cursor-pointer inline-block"
      activeClassName="bg-blue-500 !border-none"
      nextClassName="inline-block rounded bg-gray-900"
      nextLinkClassName="inline-block flex items-center py-1 px-1"
      previousClassName="inline-block rounded bg-gray-900"
      previousLinkClassName="inline-block flex items-center py-1 px-1"
      pageClassName="bg-gray-900 rounded inline-block"
      className="flex items-center gap-3 text-blue-light/70"
      pageRangeDisplayed={1}
      marginPagesDisplayed={2}
      disabledClassName="opacity-30 !cursor-not-allowed"
      {...props}
    />
  );
};

export const PaginationBtn = ({ which }: { which: 'prev' | 'next' }) => {
  return (
    <>
      {which === 'prev' ? (
        <ChevronLeft className="h-6 w-6" />
      ) : (
        <ChevronRight className="h-6 w-6" />
      )}
    </>
  );
};

export default Paginate;
