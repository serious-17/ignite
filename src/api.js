const base_url = "https://api.rawg.io/api/";
const api_key = `&key=${process.env.REACT_APP_API_KEY}`;

const currentDay = () => {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  } else {
    return `${day}`;
  }
};

const currentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  } else {
    return `${month}`;
  }
};

const year = new Date().getFullYear();

const thisYear = () => {
  return `${year}-${currentMonth()}-${currentDay()}`;
};
const lastYear = () => {
  return `${year - 1}-${currentMonth()}-${currentDay()}`;
};
const nextYear = () => {
  return `${year + 1}-${currentMonth()}-${currentDay()}`;
};

export const upcomingGamesURL = () =>
  `${base_url}games?dates=${thisYear()},${nextYear()}&page_size=11&ordering=-added${api_key}`;

export const popularGamesURL = () =>
  `${base_url}games?dates=${lastYear()},${thisYear()}&page_size=10&ordering=-rating${api_key}`;

export const newGamesURL = () =>
  `${base_url}games?dates=${lastYear()},${thisYear()}&page_size=20&ordering=-added${api_key}`;

export const searchedGamesURL = (query) =>
  `${base_url}games?search=${query}&page_size=17${api_key}`;

export const gameDetailURL = (id) => `${base_url}games/${id}?${api_key}`;

export const gameScreenshotsURL = (id) =>
  `${base_url}games/${id}/screenshots?${api_key}`;
