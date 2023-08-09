import React, { useState, useEffect } from "react";
import { Api } from "../../api/axios";
import "./Style.css";

const Modal = ({ isOpen, onClose, onSave }) => {
  const [inputValueURL, setInputValueURL] = useState("");
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueLevel, setInputValueLevel] = useState("");
  const [inputValueDescricao, setInputValueDescricao] = useState("");

  const handleSave = async () => {
    const userId = localStorage.getItem("id");
    const requestData = {
      imgUrl: inputValueURL,
      skill: inputValueName,
      level: inputValueLevel,
      descricao: inputValueDescricao,
    };
    try {
      const response = await Api.post(`/skill/${userId}`, requestData);
      console.log("Resposta da API:", response.data);
      setInputValueURL("");
      setInputValueName("");
      setInputValueLevel("");
      setInputValueDescricao("");
      onSave();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  return (
    <div className={`modal ${isOpen ? "open" : "closed"}`}>
      <div className="modal-content">
        <span>Cadastrar Skill</span>
        <label htmlFor="">
          URL da imagem
          <input
            type="text"
            required
            value={inputValueURL}
            onChange={(e) => setInputValueURL(e.target.value)}
          />
        </label>
        <label htmlFor="">
          Nome da skill
          <input
            type="text"
            required
            value={inputValueName}
            onChange={(e) => setInputValueName(e.target.value)}
          />
        </label>
        <label htmlFor="">
          Level da skill
          <input
            type="number"
            required
            value={inputValueLevel}
            onChange={(e) => setInputValueLevel(e.target.value)}
          />
        </label>
        <label htmlFor="">
          Descrição da skill
          <input
            type="text"
            required
            value={inputValueDescricao}
            onChange={(e) => setInputValueDescricao(e.target.value)}
          />
        </label>
        <div className="btn">
          <button onClick={handleSave}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
