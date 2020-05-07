import { useLocalStorage } from "./useLocalStorage";
import { useEffect } from "react";
export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useLocalStorage(false);

  useEffect(() => {
    darkMode
      ? document.body.classList.remove("dark-mode")
      : document.body.classList.add("dark-mode");
  }, [darkMode, setDarkMode]);
  return [darkMode, setDarkMode];
};
