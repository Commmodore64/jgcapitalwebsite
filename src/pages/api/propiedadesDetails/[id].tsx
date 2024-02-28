// Importa la función `NextApiRequest` y `NextApiResponse` de Next.js
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query; // Obtiene el parámetro de ruta `id`
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-Authorization": "pqnjps13ry7iaudododsi455mg22mt",
    },
  };

  try {
    const response = await fetch(
      `https://api.easybroker.com/v1/properties/${id}`,
      options
    );
    if (!response.ok) {
      throw new Error("Error al obtener datos de la API");
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener datos de la API" });
  }
}
