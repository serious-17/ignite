import React, { useEffect, useState } from "react";
import logo from "../images/logo.svg";
import style from "../styles/Nav.module.scss";
import { gamesData, darkModeState } from "./states";
import { useAtom } from "jotai";
import { searchedGamesURL } from "../api";
import fetchData from "./fetchData";
import { motion } from "framer-motion";
import { FadeIn } from "../animation";
import { useNavigate, useLocation } from "react-router-dom";
import { currentGameID } from "./states";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import darkModeHandler from "./darkMode";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [games, setGames] = useAtom(gamesData);
  const { pathname } = location;
  const [id] = useAtom(currentGameID);
  const [dark, setDark] = useAtom(darkModeState);

  const submitHandler = async (e) => {
    e.preventDefault();
    setSearch("");
    const result = await fetchData(searchedGamesURL(search));

    setGames({ ...games, searchedGames: result.data.results });
    navigate("/");
  };

  const clearSearch = () => {
    if (pathname === `/game/${id}`) {
      navigate(`/`);
      return;
    }
    setGames({ ...games, searchedGames: [] });
  };

  useEffect(() => {
    setDark(darkModeHandler(dark, "isDark?"));
  }, []);

  return (
    <motion.nav
      className={`${dark ? style.dark : ""}`}
      variants={FadeIn}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className={style.logo}>
        <div className={style.icon} onClick={clearSearch}>
          <img src={logo} alt="ignite" />
          <h1>Ignite</h1>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <input
          placeholder="Search for a game"
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
        />
        <button>Search</button>
      </form>
      <FontAwesomeIcon
        onClick={() => setDark(darkModeHandler(dark, "toggle"))}
        className={style.svg}
        icon={dark ? faSun : faMoon}
        size="2x"
        color={dark ? "white" : "black"}
      />
    </motion.nav>
  );
};

export default Nav;
