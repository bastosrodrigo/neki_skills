import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { ThemeContext } from "../../context/ThemeContext";
import logo from "../../assets/logo.png";
import Switch from "react-switch";

import "./Style.css";

const Navbar = () => {
  const { signed, signOut } = useContext(AuthContext);
  const { altoContraste, handleAltoContraste } = useContext(ThemeContext);
  const [checked, setChecked] = useState(altoContraste);

  const handleChange = () => {
    setChecked(!checked);
    handleAltoContraste(!checked);
  };

  return (
    <div className="content-navbar">
      <div className="logo">
        <img src={logo} alt="" />
        <h1>Nq.</h1>
      </div>
      <div className="switch">
        <Switch
          onChange={handleChange}
          aria-pressed={altoContraste}
          onClick={handleAltoContraste}
          checked={checked}
          className="react-switch"
          uncheckedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 15,
                color: "orange",
                paddingRight: 2,
              }}
            >
              <BsFillMoonStarsFill />
            </div>
          }
          checkedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 15,
                color: "black",
                paddingRight: 2,
              }}
            >
              <BsFillSunFill />
            </div>
          }
        />
        {signed && <button onClick={signOut}>SAIR</button>}
      </div>
    </div>
  );
};

export default Navbar;
