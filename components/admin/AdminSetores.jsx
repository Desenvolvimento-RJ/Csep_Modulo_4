import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminSetores() {
  //  Info setores
  const [perfil_setor, setPerfil_Setor] = useState("");
  const [capacidade_setor, setCapacidade_Setor] = useState(Number);

  async function carregarSetores() {
    await fetch(("/api/eventos").data);
    await fetch(("/api/setores").data);
  }

    //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/setores", {
        perfil_setor: perfil_setor,
        capacidade_setor: Number(capacidade_setor),
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
    carregarSetores();
  }, []);

  async function deletarSetores(id) {
    await fetch(`/api/setores?id=${id}`, { method: "DELETE" });
    carregarSetores();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 mt-5">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Gerenciar Setores
        </h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-4 mb-8">
          <div className="mb-4">
            {" "}
            <label className="block mb-1 text-gray-700 font-medium">
              Eventos:
            </label>{" "}
            <select
              name="evento-setor"
              id="evento-setor"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={carregarSetores}
              onChange={(e) => {
                setEventos(e.target.value);
                setErros((prev) => ({ ...prev, funcao: "" }));
              }}
            >
              <option value={carregarSetores}>Evento 1</option>
              <option value={carregarSetores}>Evento 2</option>
              <option value={carregarSetores}>Evento 3</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-medium">
              Perfil Setor:
            </label>
            <select
              name="evento"
              id="evento"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={perfil_setor}
              onChange={(e) => {
                setPerfil_Setor(e.target.value);
                setErros((prev) => ({ ...prev, funcao: "" }));
              }}
            >
              <option value="Publico Geral"> Publico Geral</option>
              <option value="VIP"> VIP</option>
              <option value="Imprensa"> Imprensa</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-medium">
              Capacidade Setor:
            </label>
            <input
              type="Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={Number}
              onChange={(e) => setCapacidade_Setor(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            disabled={!podeEnviar}
          >
            Cadastrar Setor
          </button>
        </form>

        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Setores Existentes
        </h3>

        <ul className="space-y-3">
          {setores.map((sr) => (
            <li
              key={sr.id_setor}
              className="flex justify-between items-center border p-4 rounded-md bg-gray-50 shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-900">{sr.nome}</p>
                <p className="text-sm text-gray-600">
                  Perfil: {sr.perfil_setor} | Capacidade Setor:{sr.capacidade_maxima}
                  {ev.capacidade_maxima}
                </p>
              </div>
              <button
                onClick={() => deletarSetores(ev.id_setor)}
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
