import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import { Navigate, Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

const Login = () => {
  const { signIn, signed } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(username, senha);
      toast.success("Login efetuado com sucesso!");
    } catch (error) {
      toast.error("Usuário não encontrado ou senha incorreta.");
    }
  };
  if (!signed) {
    return (
      <div className="container-login">
        <div className="content-login">
          <form className="form" onSubmit={handleSubmit}>
            <ToastContainer />
            <img src={logo} alt="" />
            <h1>Faça seu login.</h1>
            <label htmlFor="loginInput">Login</label>
            <input
              type="text"
              id="loginInput"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="senha">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                type={showPassword ? "text" : "password"}
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
            <button>ENTRAR</button>
            <p>
              Não tem cadastro? <Link to={"/registrar"}>cadastre-se</Link>
            </p>
          </form>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/home" />;
  }
};

export default Login;
