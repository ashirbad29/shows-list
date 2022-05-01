import { useQuery } from 'react-query';

import axios from '../config/axios';
import { NewestParams, ParamsType as PopularListParams } from '../routes';

const defaultParams = {
  language: 'en-US',
  include_adult: false,
  include_video: false,
  page: 1,
};

/* Popular */
export const fetchPopularList = async (
  type: 'movie' | 'tv',
  params: PopularListParams
) => {
  const { data } = await axios.get(`/discover/${type}`, {
    params: {
      ...defaultParams,
      ...params,
      sort_by: 'popularity.desc',
    },
  });

  return data;
};

export const usePopularList = (type: 'movie' | 'tv', params: PopularListParams) => {
  return useQuery(['popularList', type, { ...params }], () =>
    fetchPopularList(type, params)
  );
};

/* Genre */
export const fetchGenres = async (type: 'movie' | 'tv') => {
  const { data } = await axios.get(`/genre/${type}/list`);
  return data.genres || [];
};

export const useGenres = (type: 'movie' | 'tv') => {
  return useQuery(['genres', type], () => fetchGenres(type), {
    staleTime: 1000 * 60 * 10,
  });
};

/* Top Rated */
export const fetchTopRatedList = async (type: 'movie' | 'tv', params = {}) => {
  const { data } = await axios.get(`/${type}/top_rated/`, {
    params: {
      ...defaultParams,
      ...params,
    },
  });

  return data;
};

export const useTopRatedList = (type: 'movie' | 'tv', params = {}) => {
  return useQuery(['topRated', type, { ...params }], () =>
    fetchTopRatedList(type, params)
  );
};

/* Trending Shows */
export const fetchTrendingShows = async (
  type: 'tv' | 'movie',
  params: { page: number }
) => {
  const { data } = await axios.get(`/trending/${type}/week`, {
    params: {
      ...defaultParams,
      ...params,
    },
  });

  return data;
};

export const useTrendingShows = (type: 'tv' | 'movie', params: { page: number }) => {
  return useQuery(['trendingShows', type, { ...params }], () =>
    fetchTrendingShows(type, params)
  );
};

/* Newest Shows */
export const fetchNewestShows = async (type: 'tv' | 'movie', params: NewestParams) => {
  const { data } = await axios.get(`/discover/${type}`, {
    params: {
      ...defaultParams,
      'vote_average.gte': 5,
      'vote_count.gte': 1000,
      ...params,
      sort_by: 'primary_release_date.desc',
    },
  });

  return data;
};

export const useNewestShows = (type: 'tv' | 'movie', params: NewestParams) => {
  return useQuery(['newestShows', type, { ...params }], () =>
    fetchNewestShows(type, params)
  );
};

/* Search */
export const fetchSearch = async (
  type: 'movie' | 'tv',
  params: { page: number; query: string }
) => {
  const { data } = await axios.get(`/search/${type}`, {
    params: {
      ...defaultParams,
      ...params,
    },
  });

  return data;
};

export const useSearch = (type: 'movie' | 'tv', page: number, query: string) => {
  return useQuery(['search', type, page, query], () =>
    fetchSearch(type, { page, query })
  );
};
