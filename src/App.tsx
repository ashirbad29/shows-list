import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Newest, Popular, Search, TopRated, Trending } from './routes';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-800">
        <Routes>
          <Route path="/" element={<Popular />} />
          <Route path="popular" element={<Popular />} />
          <Route path="newest" element={<Newest />} />
          <Route path="trending" element={<Trending />} />
          <Route path="top-rated" element={<TopRated />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
