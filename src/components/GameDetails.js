import React from "react";
import { useAtom } from "jotai";
import { currentGameDetail, currentGameID } from "./states";
import smallImg from "./smallImg";
import style from "../styles/GameDetail.module.scss";
import { motion } from "framer-motion";

import playstation from "../images/playstation.svg";
import xbox from "../images/xbox.svg";
import steam from "../images/steam.svg";
import nintendo from "../images/nintendo.svg";
import apple from "../images/apple.svg";
import gamepad from "../images/gamepad.svg";
import starEmpty from "../images/star-empty.png";
import starFull from "../images/star-full.png";

const GameDetails = ({ id }) => {
  const [details, setDetails] = useAtom(currentGameDetail);
  const { game, screen } = details;
  const [path, setPath] = useAtom(currentGameID);

  const closeDetails = (e) => {
    if (e.target.classList.contains("shadow")) {
      setPath(null);
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = `0rem`;
    }
  };

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

  //   return;
  return (
    <motion.div
      onClick={closeDetails}
      className={`${style.detailContainer} shadow`}
    >
      <motion.div layoutId={id} className={style.gameDetails}>
        <div className={style.title}>
          <div className={style.info}>
            <motion.h3 layoutId={`title ${id}`}>{game.name}</motion.h3>
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
              ></img>
            ))}
          </div>
        </div>
        <motion.img
          className={style.bg_image}
          src={smallImg(game.background_image, 1280)}
          alt={game.name}
          layoutId={`image ${id}`}
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
