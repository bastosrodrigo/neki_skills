import { Route, Routes, BrowserRouter } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { ThemeContextProvider } from "../context/ThemeContext";
import PrivateRoutes from "./PrivateRoutes";

import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound/NotFound";

const Rotas = () => {
  return (
    <AuthContext>
      <ThemeContextProvider>
        <BrowserRouter>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            {/*Rotas privadas*/}
            <Route path="/home" element={<PrivateRoutes />}>
              <Route path="/home" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeContextProvider>
    </AuthContext>
  );
};

export default Rotas;
