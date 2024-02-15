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

    // Realizar la solicitud a la API para la página 1
    const responsePage1 = await fetch(
      "https://api.easybroker.com/v1/properties?page=1&limit=50",
      options
    );

    // Realizar la solicitud a la API para la página 2
    const responsePage2 = await fetch(
      "https://api.easybroker.com/v1/properties?page=2&limit=50",
      options
    );

    // Verificar si alguna de las respuestas no es exitosa
    if (!responsePage1.ok || !responsePage2.ok) {
      throw new Error("Error al obtener datos de la API");
    }

    // Convertir las respuestas a formato JSON
    const dataPage1 = await responsePage1.json();
    const dataPage2 = await responsePage2.json();

    // Combinar los datos de ambas páginas
    const combinedData = {
      content: [...dataPage1.content, ...dataPage2.content],
    };

    // Devolver los datos combinados como respuesta de la API de Next.js
    res.status(200).json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
