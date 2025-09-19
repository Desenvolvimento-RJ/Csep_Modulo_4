import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { perfil_setor,capacidade_setor } = req.body;

  // GET - Listar setor
  if (req.method === "GET") {
    try {
      const setores = await prisma.setores.findMany();
      return res.status(200).json(evento);
    } catch (error) {
      console.error("Erro ao buscar setor:", error);
      return res.status(500).json({ error: "Erro ao buscar setor" });
    }
  }

  // POST - Criar setor
  if (req.method === "POST") {
    // Validação
    if (!perfil_setor || !capacidade_setor) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    try {
      const setorExistente = await prisma.setor.findUnique({
        where: { id_setor:Number(id_setor)},
      });

      if (!setorExistente) {
        return res.status(400).json({ error: "setor já cadastrado" });
      }

      // Cria novo setor
      const novoSetor = await prisma.evento.create({
        where:{ id_setor: Number(id_setor)},
        data: {
        perfil_setor: perfil_setor,
        capacidade_setor: Number(capacidade_setor)
        },
      });

      return res.status(201).json({ message: "Setor criado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao cadastrar Setor" });
    }
  }

  // DELETE - Deletar setor
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "ID do evento não fornecido" });
    }

    try {
      const setor = await prisma.setor.findUnique({
        where:{ id_setor : Number(id_setor)},
      });

      if (!setor) {
        return res.status(404).json({ error: "evento não encontrado" });
      }

      await prisma.setor.delete({
        here:{ id_setor : Number(id_setor)},
      });

      return res.status(204).end();
    } catch (error) {
      console.error("Erro ao deletar setor:", error);
      return res.status(500).json({ error: "Erro ao deletar setor" });
    }
  }
  //PUT - Atualizar setor
  if (req.method === "PUT") {
    try {
      const { id_setor,perfil_setor,capacidade_setor } = req.body;

      const setorAtualizado = await prisma.setor.update({
        where: { id_setor: Number(id_setor) },
        data: {
          perfil_setor:perfil_setor,
          capacidade_setor: Number(capacidade_setor)
        },
      });

      return res.status(200).json(setorAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar setor:", error);
      return res.status(500).json({ error: "Erro ao atualizar setor" });
    }
  }

  
  return res.status(405).json({ error: "Método não permitido" });
}

