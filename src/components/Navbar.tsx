import cx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

import { SearchIcon } from '../assets/icons';

const navLinks = [
  {
    to: '/popular',
    label: 'Popular',
  },
  {
    to: '/trending',
    label: 'Trending',
  },
  {
    to: '/top-rated',
    label: 'Top Rated',
  },
  {
    to: '/newest',
    label: 'Newest',
  },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex justify-between items-center">
      <Link to="/" className="text-gray-200 text-2xl">
        Discover
      </Link>
      <div>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={cx(
              'font-semibold text-blue-400 text-xs mx-1 hover:text-blue-600 transition-all px-2 py-1 rounded-md hover:bg-blue-200/5',
              {
                'text-white': pathname === to || (to === '/popular' && pathname === '/'),
              }
            )}>
            {label.toUpperCase()}
          </Link>
        ))}
      </div>
      <div>
        <Link
          to="/search"
          className="text-gray-200 hover:bg-blue-200/5 px-2 py-1 rounded-md flex items-center">
          <SearchIcon className="w-4 h-4 inline-block mr-2" />
          <span className="text-blue-400 font-semibold text-xs">SEARCH</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
