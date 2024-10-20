import React from "react";
import style from "../styles/Game.module.scss";
import { currentGameID, currentGameDetail } from "./states";
import { useAtom } from "jotai";
import smallImg from "./smallImg";
import fetchData from "./fetchData";
import { gameDetailURL, gameScreenshotsURL } from "../api";
import { motion } from "framer-motion";
import { CardAnim } from "../animation";

const Game = ({ game }) => {
  const [id, setId] = useAtom(currentGameID);
  const [about, setAbout] = useAtom(currentGameDetail);

  const setGameId = async () => {
    const details = await fetchData(gameDetailURL(game.id));
    const screenshots = await fetchData(gameScreenshotsURL(game.id));

    setId(details.data.id);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `0.5rem`;

    setAbout({
      ...about,
      game: details.data,
      screen: screenshots.data.results,
    });
  };

  return (
    <motion.div
      variants={CardAnim}
      animate="show"
      exit="exit"
      initial="hidden"
      layoutId={game.id}
      className={style.game}
      onClick={setGameId}
    >
      <motion.h3 layoutId={`title ${game.id}`}>{game.name}</motion.h3>
      <p>{game.released}</p>
      <motion.img
        layoutId={`image ${game.id}`}
        src={game.background_image ? smallImg(game.background_image, 640) : ""}
        alt={game.name}
      />
    </motion.div>
  );
};

export default Game;
