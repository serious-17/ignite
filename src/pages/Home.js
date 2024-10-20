import React, { useEffect } from "react";
import { currentGameID, gamesData } from "../components/states";
import { useAtom } from "jotai";
import { newGamesURL, popularGamesURL, upcomingGamesURL } from "../api";
import fetchData from "../components/fetchData";
import style from "../styles/Home.module.scss";
import { LayoutGroup } from "framer-motion";
import { motion } from "framer-motion";

import GameDetails from "../components/GameDetails";
import Game from "../components/Game";
import { FadeIn } from "../animation";

const Home = () => {
  const [games, setGames] = useAtom(gamesData);
  const [id] = useAtom(currentGameID);

  const getData = async () => {
    const newGames = await fetchData(newGamesURL());
    const upcomingGames = await fetchData(upcomingGamesURL());
    const populargames = await fetchData(popularGamesURL());

    setGames({
      ...games,
      newGames: newGames.data.results,
      popularGames: populargames.data.results,
      upcomingGames: upcomingGames.data.results,
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
      className={style.home}
    >
      <div className={style.gameList}>
        <LayoutGroup>
          {id && <GameDetails />}

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
            {upcomingGames.map((game) => (
              <Game game={game} key={game.id} />
            ))}
          </div>

          <motion.h2 layout>Popular Games</motion.h2>
          <div className={style.games}>
            {popularGames.map((game) => (
              <Game game={game} key={game.id} />
            ))}
          </div>

          <motion.h2 layout>New Games</motion.h2>
          <div className={style.games}>
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
