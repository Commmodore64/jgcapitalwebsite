import { Divider } from "@nextui-org/react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { FaBath, FaBed, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const PropiedadesAll: FC = () => {
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Ejecutar solo una vez al montar el componente
  return (
    <>
      <div className="m-12">
        <p className="p-1.5 text-3xl font-bold tracking-tighter sm:text-3xl xl:text-4xl/none bg-clip-text text-transparent bg-gradient-to-l from-gray-400 to-black ml-20">
          Propiedades
        </p>
        <Link href="/">
          <FaArrowLeftLong />
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="w-10/12 px-1">
          <Divider />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 m-16">
        {data?.content.map((item: any, index: number) => (
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
                <FaWhatsapp className="w-5 h-6" />
              </Button>
              <Button>
                <FaPhoneAlt className="w-5 h-6" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default PropiedadesAll;
