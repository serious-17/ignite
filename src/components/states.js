import { atom } from "jotai";
export const countAtom = atom(0);

export const gamesData = atom({
  newGames: [],
  popularGames: [],
  upcomingGames: [],
  searchedGames: [],
  isLoading: true,
});

export const currentGameDetail = atom({
  game: [],
  screen: [],
  isLoading: true,
});

export const currentGameID = atom(null);

export const darkModeState = atom(false);
