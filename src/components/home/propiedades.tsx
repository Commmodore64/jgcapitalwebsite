import { FC, useEffect, useState } from "react";
import { FaBath, FaBed, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

// Utils
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const Propiedades: FC = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar la solicitud a la API de tu proyecto Next.js
        const response = await fetch("/api/propiedadesApi");

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
          throw new Error("Error al obtener datos de la API");
        }

        // Convertir la respuesta a formato JSON
        const data = await response.json();
        setData(data);

        // Utilizar los datos obtenidos
        console.log(data.content[0]);
        console.log(data.content[0].property_type);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Ejecutar solo una vez al montar el componente

  return (
    <>
      <div className="flex items-center justify-end mr-72 p-5 font-semibold">
        <Link href="/propiedades">Todas las propiedades</Link>
        <IoIosArrowRoundForward className="ml-1" />
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {data?.content.slice(0, 3).map((item: any, index: number) => (
          <Card key={index} className="w-[350px] shadow-md">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 overflow-hidden">
                <img
                  className="object-cover w-full h-full rounded-lg shadow-lg"
                  src={item.title_image_full}
                  alt="Foto propiedad"
                />
              </div>
              <form className="flex flex-row p-2 items-center">
                <div className="flex items-center mr-4">
                  <FaBed className="w-5 h-4 mr-2" />
                  <span>{item.bedrooms || 0}</span>
                </div>
                <div className="flex items-center">
                  <FaBath className="w-4 h-4 mr-2" />
                  <span>{item.bathrooms || 0}</span>
                  <span className="ml-2">
                    Tipo: {item.property_type || "Desconocido"}
                  </span>
                </div>
              </form>
              <Badge className="mt-2 text-sm">
                {item.operations[0].formatted_amount}
              </Badge>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4">
              <Button>
                <a
                  href={`https://wa.me/+526141636322?text=${encodeURIComponent(
                    `¡Hola! Estoy interesado en la propiedad "${item.title}". ¿Podrías proporcionarme más información?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="w-5 h-6" />
                </a>
              </Button>

              <Button>
                <a href="tel:+526141636322">
                  <FaPhoneAlt className="w-5 h-6" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center my-10">
        <p className=" font-bold text-3xl">¿Buscas algo más específico?</p>
        <Button className=" mt-7 w-52 text-md">
          <Link href="/propiedadesBusqueda">Busqueda Personalizada</Link>
        </Button>
      </div>
    </>
  );
};

export default Propiedades;
