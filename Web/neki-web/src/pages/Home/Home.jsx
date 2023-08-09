import React, { useState, useEffect } from "react";
import { Api } from "../../api/axios";
import { BsFillPencilFill } from "react-icons/bs";
import { AiFillDelete, AiFillSave } from "react-icons/ai";
import Navbar from "../../components/Nabvar/Navbar";
import Modal from "../../components/Modal/Modal";
import "./Style.css";

const ITEM_POR_PAG = 5;

const Home = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editarIndex, setEditarIndex] = useState(-1);
  const [editarLevel, setEditarLevel] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPags = Math.ceil(data.length / ITEM_POR_PAG);

  const handleEditar = (index, level) => {
    setEditarIndex(index);
    setEditarLevel(level);
  };

  const handleSalvarEdit = async (index) => {
    try {
      const editarItem = data[index];
      const itemId = editarItem.id;

      const updateData = {
        id: data[index].id,
        usuario: data[index].usuario,
        skill: data[index].skill,
        level: editarLevel,
        imgUrl: data[index].imgUrl,
        descricao: data[index].descricao,
      };
      const newData = [...data];

      await Api.put(`/skill/${itemId}`, updateData);

      newData[index].level = editarLevel;
      setData(newData);
      console.log(newData);
      setEditarIndex(-1);
      setEditarLevel("");
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
    console.log("Agora é true");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    console.log("Agora é false");
  };

  const handleSaveData = (inputValue) => {
    setIsModalOpen(false);
  };

  const handlePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * ITEM_POR_PAG;
  const itemPorPag = data.slice(startIndex, startIndex + ITEM_POR_PAG);

  const handleDelete = (itemId) => {
    Api.delete(`/skill/${itemId}`)
      .then((response) => {
        if (response.status === 200) {
          setData((prevItems) => prevItems.filter((item) => item.id != itemId));
        }
      })
      .catch((error) => {
        console.error("Erro ao deletar", error);
      });
  };

  useEffect(() => {
    let idUsuario = localStorage.getItem("id");
    Api.get(`/skill/usuario/${idUsuario}`)
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className="table-wrapper">
        <Navbar />
        <div className="content-tabela">
          <h1>Minhas skills favoritas</h1>
          <button onClick={handleAddClick}>Adicionar +</button>
          <table>
            <thead className="tabela">
              <tr>
                <th scope="col">IMAGEM</th>
                <th scope="col">SKILL</th>
                <th scope="col">LEVEL</th>
                <th scope="col">DESCRIÇÃO</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {itemPorPag.length === 0 ? (
                  <p>Nenhuma skill cadastrada!</p>
              ) : (
                itemPorPag.map((d, i) => (
                  <tr key={i}>
                    <td data-label="Imagem">
                      <img src={d.imgUrl} />
                    </td>
                    <td data-label="Skill">{d.skill}</td>
                    <td data-label="Level" className="level">
                      {editarIndex === i ? (
                        <input
                          type="text"
                          value={editarLevel}
                          onChange={(e) => setEditarLevel(e.target.value)}
                        />
                      ) : (
                        d.level
                      )}
                      {editarIndex === i ? (
                        <button onClick={() => handleSalvarEdit(i)}>
                          <AiFillSave />
                        </button>
                      ) : (
                        <button onClick={() => handleEditar(i, d.level)}>
                          <BsFillPencilFill />
                        </button>
                      )}
                    </td>
                    <td data-label="Descrição">{d.descricao}</td>
                    <td data-label="Ações">
                      <span className="actions">
                        <button onClick={() => handleDelete(d.id)}>
                          <AiFillDelete />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: totalPags }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePage(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveData}
      />
    </div>
  );
};

export default Home;
