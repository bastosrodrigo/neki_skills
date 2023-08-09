import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Api } from "../../api/axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import "./Style.css";

const Schema = Yup.object().shape({
  //loginInput: Yup.string().required("*Campo obrigatório."),
});

const Register = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmeSenha, setConfirmeSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmeSenha) {
      toast.error("As senhas precisam ser iguais.");
      return;
    }

    const newUser = {
      username: login,
      password: senha,
    };

    try {
      await Schema.validate(newUser, { abortEarly: false });
      await Api.post("/auth/signup", newUser);
      toast.success("Conta criada com sucesso!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Erro ao cadastrar:", error);
      }
    }
  };
  return (
    <div className="container-register">
      <div className="content-register">
        <form className="form" onSubmit={handleSubmit}>
          <ToastContainer />
          <img src={logo} alt="Logotipo da Nequi" />
          <h1>Cadastrar-se.</h1>
          <label htmlFor="loginInput">Seu nome</label>
          <input
            id="loginInput"
            type="text"
            required
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          {errors.loginInput && <p className="error">{errors.loginInput}</p>}
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
            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible/>}
            </span>
            <label htmlFor="confirmeSenhaInput">
              Insira a senha mais uma vez
            </label>
            <input
              id="confirmeSenhaInput"
              type={showPassword ? "text" : "password"}
              required
              value={confirmeSenha}
              onChange={(e) => setConfirmeSenha(e.target.value)}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible/>}
            </span>
          </div>
          <button type="submit">ENTRAR</button>
          <p>Já tem cadastro? <Link to={"/"}>entrar</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
