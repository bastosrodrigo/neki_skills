import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext(null);

export function ThemeContextProvider(props) {
  const [altoContraste, setAltoContraste] = useState(false);

  function handleAltoContraste() {
    setAltoContraste(!altoContraste);
    localStorage.setItem("theme", JSON.stringify(!altoContraste));
  }

  useEffect(() => {
    var theme = JSON.parse(localStorage.getItem("theme"));
    if(theme === null) return;
    setAltoContraste(theme);
  }, [])

  useEffect(() => {
    if (altoContraste) {
      document.documentElement.style.setProperty(
        "--background-color-primaria",
        "var(--cor-branco)"
      );
      document.documentElement.style.setProperty(
        "--background-color-um",
        "var(--cor-secundaria)"
      );
      document.documentElement.style.setProperty(
        "--color-text",
        "var(--cor-primaria)"
      );
      document.documentElement.style.setProperty(
        "--background-color-tabela",
        "var(--cor-primaria-um)"
      );
    } else {
      document.documentElement.style.setProperty(
        "--background-color-primaria",
        "var(--cor-primaria)"
      );
      document.documentElement.style.setProperty(
        "--background-color-um",
        "var(--cor-primaria-um)"
      );
      document.documentElement.style.setProperty(
        "--color-text",
        "var(--cor-secundaria)"
      );
      document.documentElement.style.setProperty(
        "--background-color-tabela",
        "var(--cor-secundaria)"
      );
    }
  }, [altoContraste]);

  return (
    <ThemeContext.Provider value={{ altoContraste, handleAltoContraste }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
