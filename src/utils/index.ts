export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getImagePath = (path: string, type: string = 'w342') => {
  return `${IMAGE_BASE_URL}/${type}/${path}`;
};

export const getYearsDropdownList = (limit: number = 1980) => {
  const currYear = new Date().getFullYear();
  const years = [];

  if (limit > currYear) {
    limit = currYear;
  }

  for (let year = currYear; year >= limit; year--) {
    years.push({ id: year.toString(), label: year.toString() });
  }

  return years;
};
