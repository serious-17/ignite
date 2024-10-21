const darkModeHandler = (dark, fn) => {
  let darkMode;
  if (localStorage.getItem("darkmode") === null) {
    darkMode = dark;
  } else {
    darkMode = JSON.parse(localStorage.getItem("darkmode"));
  }

  if (fn === "toggle") {
    darkMode = !darkMode;
    localStorage.setItem("darkmode", JSON.stringify(darkMode));
  }

  return darkMode;
};

export default darkModeHandler;
