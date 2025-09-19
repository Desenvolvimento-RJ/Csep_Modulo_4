import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminEventos() {

  //  Info evento
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [capacidade_maxima, setCapacidade_maxima] = useState("");

    //Carregar Eventos
  async function carregarEventos() {
    await fetch(("/api/eventos").data);
  }
  
  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/eventos", {
        nome: nome,
        data: new Date(data),
        capacidade_maxima: Number(capacidade_maxima),
      });

      if (response.status === 201) {
        alert("Cadastro evento realizado com sucesso!");

        carregarEventos();
      } else {
        alert("Erro ao cadastrar, tente de outra forma!");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor");
    }
  };

  useEffect(() => {
    carregarEventos();
  }, []);

  async function deletarEvento(id) {
    await fetch(`/api/eventos?id=${id}`, { method: "DELETE" });
    carregarEventos();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 mt-5">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Gerenciar Eventos
        </h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-4 mb-8">
          <div className="mb-4">
            {" "}
            <label className="block mb-1 text-gray-700 font-medium">
              Nome do Evento:
            </label>{" "}
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-medium">Data:</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={Date}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-medium">
              Capacidade Máxima:
            </label>
            <input
              type="Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={Number}
              onChange={(e) => setCapacidade_maxima(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            disabled={!podeEnviar}
          >
            Cadastrar Evento
          </button>
        </form>

        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Eventos Existentes
        </h3>

        <ul className="space-y-3">
          {eventos.map((ev) => (
            <li
              key={ev.id_evento}
              className="flex justify-between items-center border p-4 rounded-md bg-gray-50 shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-900">{ev.nome}</p>
                <p className="text-sm text-gray-600">
                  Data: {new Date(data).ev} | Capacidade Maxima: {ev.capacidade_maxima}
                </p>
              </div>
              <button
                onClick={() => deletarEvento(ev.id_evento)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition duration-200"
              >
                Deletar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
