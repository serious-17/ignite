import React, { useEffect } from "react";
import { gamesData, darkModeState } from "../components/states";
import { useAtom } from "jotai";
import { newGamesURL, popularGamesURL, upcomingGamesURL } from "../api";
import fetchData from "../components/fetchData";
import style from "../styles/Home.module.scss";
import { LayoutGroup } from "framer-motion";
import { motion } from "framer-motion";

import Game from "../components/Game";
import { FadeIn } from "../animation";
import { Icon } from "@iconify/react/dist/iconify.js";

const Home = () => {
  const [games, setGames] = useAtom(gamesData);
  const [dark] = useAtom(darkModeState);

  if (dark) {
    document.body.style.color = `white`;
    document.body.style.background = `#1b1b1b`;
  } else {
    document.body.style.color = `black`;
    document.body.style.background = `white`;
  }

  const getData = async () => {
    const newGames = await fetchData(newGamesURL());
    const upcomingGames = await fetchData(upcomingGamesURL());
    const populargames = await fetchData(popularGamesURL());

    setGames({
      ...games,
      newGames: newGames.data.results,
      popularGames: populargames.data.results,
      upcomingGames: upcomingGames.data.results,
      isLoading: false,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const { popularGames, upcomingGames, newGames, searchedGames } = games;

  return (
    <motion.div
      variants={FadeIn}
      initial="hidden"
      animate="show"
      exit="exit"
      className={`${style.home} ${dark ? style.dark : ""}`}
    >
      <div className={style.gameList}>
        <LayoutGroup>
          {searchedGames.length ? (
            <>
              <h2>Searched Games</h2>
              <div className={style.games}>
                {searchedGames.map((game) => (
                  <Game game={game} key={game.id} />
                ))}
              </div>
            </>
          ) : (
            ""
          )}

          <motion.h2 layout>Upcoming Games</motion.h2>
          <div className={style.games}>
            {games.isLoading && (
              <Icon
                icon="line-md:loading-twotone-loop"
                width="32px"
                height="32px"
                style={{ color: dark ? "white" : "black" }}
              />
            )}
            {upcomingGames.map((game) => (
              <Game game={game} key={game.id} />
            ))}
          </div>

          <motion.h2 layout>Popular Games</motion.h2>
          <div className={style.games}>
            {games.isLoading && (
              <Icon
                icon="line-md:loading-twotone-loop"
                width="32px"
                height="32px"
                style={{ color: dark ? "white" : "black" }}
              />
            )}
            {popularGames.map((game) => (
              <Game game={game} key={game.id} />
            ))}
          </div>

          <motion.h2 layout>New Games</motion.h2>
          <div className={style.games}>
            {games.isLoading && (
              <Icon
                icon="line-md:loading-twotone-loop"
                width="32px"
                height="32px"
                style={{ color: dark ? "white" : "black" }}
              />
            )}
            {newGames.map((game) => (
              <Game game={game} key={game.id} />
            ))}
          </div>
        </LayoutGroup>
      </div>
    </motion.div>
  );
};

export default Home;
