export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getImagePath = (path: string, type: string = 'w342') => {
  return `${IMAGE_BASE_URL}/${type}/${path}`;
};
