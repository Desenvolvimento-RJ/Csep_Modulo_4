import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { nome,data,capacidade_maxima } = req.body;

  // GET - Listar evento
  if (req.method === "GET") {
    try {
      const evento = await prisma.usuario.findMany();
      return res.status(200).json(evento);
    } catch (error) {
      console.error("Erro ao buscar evento:", error);
      return res.status(500).json({ error: "Erro ao buscar evento" });
    }
  }

  // POST - Criar evento
  if (req.method === "POST") {
    // Validação
    if (!nome || !data || !capacidade_maxima) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    try {
      // Verifica se já existe um mesmo evento ja esta cadastrado
      const eventoExistente = await prisma.evento.findUnique({
        where: { id_evento : Number(id_evento)},
      });

      if (!eventoExistente) {
        return res.status(400).json({ error: "Evento já cadastrado" });
      }

      // Cria novo evento
      const novoEvento = await prisma.evento.create({
        where:{ id_evento : Number(id_evento)},
        data: {
         nome,
         data: new Date(data),
         capacidade_maxima: Number(capacidade_maxima)
        },
      });

      return res.status(201).json({ message: "Evento criado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao cadastrar evento" });
    }
  }

  // DELETE - Deletar evento
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "ID do evento não fornecido" });
    }

    try {
      const evento = await prisma.evento.findUnique({
        where:{ id_evento : Number(id_evento)},
      });

      if (!evento) {
        return res.status(404).json({ error: "evento não encontrado" });
      }

      await prisma.evento.delete({
        here:{ id_evento : Number(id_evento)},
      });

      return res.status(204).end();
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
      return res.status(500).json({ error: "Erro ao deletar evento" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { id, nome, data ,capacidade_maxima } = req.body;

      const eventoAtualizado = await prisma.evento.update({
        where: { id: Number(id) },
        data: {
          nome,
          data: new Date(data),
          capacidade_maxima: Number(capacidade_maxima)
        },
      });

      return res.status(200).json(eventoAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      return res.status(500).json({ error: "Erro ao atualizar evento" });
    }
  }

  
  return res.status(405).json({ error: "Método não permitido" });
}
