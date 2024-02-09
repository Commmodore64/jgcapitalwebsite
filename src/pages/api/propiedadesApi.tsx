// En el archivo /pages/api/contactRequests.js
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Opciones para la solicitud fetch
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-Authorization": "pqnjps13ry7iaudododsi455mg22mt",
      },
    };

    // Realizar la solicitud a la API
    const response = await fetch(
      "https://api.easybroker.com/v1/properties?page=1&limit=20",
      options
    );

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error("Error al obtener datos de la API");
    }

    // Convertir la respuesta a formato JSON
    const data = await response.json();

    // Devolver los datos obtenidos como respuesta de la API de Next.js
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
