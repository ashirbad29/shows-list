import { useQuery } from 'react-query';

import axios from '../config/axios';

const defaultParams = {
  language: 'en-US',
  include_adult: false,
  include_video: false,
  page: 1,
};

export const fetchPopularList = async (type: 'movie' | 'tv', params = {}) => {
  const { data } = await axios.get(`/discover/${type}`, {
    params: {
      ...defaultParams,
      ...params,
      sort_by: 'popularity.desc',
    },
  });

  return data;
};

export const usePopularList = (type: 'movie' | 'tv', params = {}) => {
  return useQuery(['popularList', type, { ...params }], () =>
    fetchPopularList(type, params)
  );
};

export const fetchGenres = async (type: 'movie' | 'tv') => {
  const { data } = await axios.get(`/genre/${type}/list`);
  return data.genres || [];
};

export const useGenres = (type: 'movie' | 'tv') => {
  return useQuery(['genres', type], () => fetchGenres(type));
};
