import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import queryClient from './config/query';
import { Newest, Popular, Search, TopRated, Trending } from './routes';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-800 min-w-[920px] overflow-auto">
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Popular />} />
            <Route path="popular" element={<Popular />} />
            <Route path="newest" element={<Newest />} />
            <Route path="trending" element={<Trending />} />
            <Route path="top-rated" element={<TopRated />} />
            <Route path="search" element={<Search />} />
          </Routes>
          <ReactQueryDevtools position="bottom-right" />
        </QueryClientProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
