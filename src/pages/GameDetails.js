import React, { useEffect } from "react";
import { useAtom } from "jotai";
import {
  currentGameDetail,
  currentGameID,
  darkModeState,
} from "../components/states";
import smallImg from "../components/smallImg";
import style from "../styles/GameDetail.module.scss";
import { motion } from "framer-motion";

import playstation from "../images/playstation.svg";
import xbox from "../images/xbox.svg";
import steam from "../images/steam.svg";
import nintendo from "../images/nintendo.svg";
import apple from "../images/apple.svg";
import gamepad from "../images/gamepad.svg";
import starEmpty from "../images/star-empty.png";
import { useLocation } from "react-router-dom";
import starFull from "../images/star-full.png";
import { exit } from "../animation";
import fetchData from "../components/fetchData";
import { gameDetailURL, gameScreenshotsURL } from "../api";
import { Icon } from "@iconify/react/dist/iconify.js";

const GameDetails = () => {
  const { pathname } = useLocation();

  const [details, setDetails] = useAtom(currentGameDetail);
  const { game, screen } = details;
  const [path, setPath] = useAtom(currentGameID);
  const [dark] = useAtom(darkModeState);

  const getPlatform = (platform) => {
    switch (platform) {
      case "PlayStation 4":
        return playstation;
        break;
      case "PlayStation 5":
        return playstation;
        break;
      case "Xbox One":
        return xbox;
        break;
      case "Xbox Series S/X":
        return xbox;
        break;
      case "PC":
        return steam;
        break;
      case "Nintendo Switch":
        return nintendo;
        break;
      case "macOS":
        return apple;
        break;
      case "iOS":
        return apple;
        break;

      default:
        return gamepad;
        break;
    }
  };

  const getRating = () => {
    const stars = [];
    const rating = game.rating;
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img key={i} src={starFull} alt="star" />);
      } else {
        stars.push(<img key={i} src={starEmpty} alt="star" />);
      }
    }
    return stars;
  };

  const loadGameHandler = async () => {
    const gameId = pathname.split("/")[2];

    const gameDetails = await fetchData(gameDetailURL(gameId));
    const screenshots = await fetchData(gameScreenshotsURL(gameId));

    setPath(gameId);
    setDetails({
      ...details,
      game: gameDetails.data,
      screen: screenshots.data.results,
      isLoading: false,
    });
  };

  useEffect(() => {
    setDetails({ ...details });
    window.scrollTo(0, 0);
    if (!details.screen.length) {
      loadGameHandler();
    }
  }, []);

  if (details.isLoading) return;
  return (
    <motion.div
      variants={exit}
      initial="hidden"
      animate="show"
      exit="exit"
      className={`${style.detailContainer} shadow`}
    >
      <motion.div
        layoutId={path}
        className={`${style.gameDetails} ${dark ? style.dark : ""}`}
      >
        <div className={style.title}>
          <div className={style.info}>
            <motion.h3 layoutId={`title ${path}`}>{game.name}</motion.h3>
            <div className={style.rating}>
              <p>Rating: ({game.rating})</p>
              {getRating()}
            </div>
          </div>
          <div className={style.platforms}>
            <h3>Platforms:</h3>

            {game.platforms.map((platform) => (
              <img
                key={platform.platform.name}
                src={getPlatform(platform.platform.name)}
                className={
                  getPlatform(platform.platform.name) === steam
                    ? style.steam
                    : ""
                }
              />
            ))}
          </div>
        </div>
        <motion.img
          className={style.bg_image}
          src={smallImg(game.background_image, 1280)}
          alt={game.name}
          layoutId={`image ${path}`}
        />
        <div className={style.desc}>
          <p>{game.description_raw}</p>
        </div>

        {screen.map((screenshot) => (
          <img
            key={screenshot.image}
            src={smallImg(screenshot.image, 1280)}
            alt="screenshot"
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default GameDetails;
