import { Divider, Pagination } from "@nextui-org/react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/propiedadesApi");

        if (!response.ok) {
          throw new Error("Error al obtener datos de la API");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const totalProperties = data?.content.length || 0;
  const totalPages = Math.ceil(totalProperties / propertiesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplazamiento hacia arriba con animación suave
  };

  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = currentPage * propertiesPerPage;

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
        {data?.content
          .slice(startIndex, endIndex)
          .map((item: any, index: number) => (
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

      <div className="flex justify-center mt-8">
        <Pagination
          className="mb-8"
          total={totalPages}
          initialPage={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default PropiedadesAll;
