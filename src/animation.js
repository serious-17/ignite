export const FadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.75 } },
  exit: { opacity: 1, transition: { duration: 0.75 } },
};

export const CardAnim = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.75 } },
  exit: { opacity: 1, scale: 1, transition: { duration: 0.75 } },
};
