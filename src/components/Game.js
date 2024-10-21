import React from "react";
import style from "../styles/Game.module.scss";
import { currentGameID, currentGameDetail, darkModeState } from "./states";
import { useAtom } from "jotai";
import smallImg from "./smallImg";
import fetchData from "./fetchData";
import { gameDetailURL, gameScreenshotsURL } from "../api";
import { motion } from "framer-motion";
import { CardAnim } from "../animation";
import { Link } from "react-router-dom";

const Game = ({ game }) => {
  const [id, setId] = useAtom(currentGameID);
  const [about, setAbout] = useAtom(currentGameDetail);
  const [dark] = useAtom(darkModeState);

  const loadGameHandler = async () => {
    setAbout({ ...about, isLoading: true });

    const details = await fetchData(gameDetailURL(game.id));
    const screenshots = await fetchData(gameScreenshotsURL(game.id));

    setId(game.id);
    setAbout({
      ...about,
      game: details.data,
      screen: screenshots.data.results,
      isLoading: false,
    });
  };

  return (
    <motion.div
      variants={CardAnim}
      animate="show"
      exit="exit"
      initial="hidden"
      layoutId={game.id}
      className={`${style.game} ${dark ? style.dark : ""}`}
      onClick={loadGameHandler}
    >
      <Link to={`/game/${game.id}`}>
        <motion.h3 layoutId={`title ${game.id}`}>{game.name}</motion.h3>
        <p>{game.released}</p>
        <motion.img
          layoutId={`image ${game.id}`}
          src={
            game.background_image ? smallImg(game.background_image, 640) : ""
          }
          alt={game.name}
        />
      </Link>
    </motion.div>
  );
};

export default Game;
