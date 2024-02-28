import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Divider, Pagination } from "@nextui-org/react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { FaBath, FaBed, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import { RxRulerHorizontal } from "react-icons/rx";
import { TbResize } from "react-icons/tb";
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
interface PropertyData {
  content: {
    title: string;
    location: string;
    title_image_full: string;
    bedrooms: number;
    bathrooms: number;
    property_type: string;
    operations: { formatted_amount: string }[];
  }[];
}

const PropiedadesAll: FC = () => {
  const [data, setData] = useState<PropertyData | null>(null);
  const [propertyDetails, setPropertyDetails] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 12;

  const fetchPropertyDetails = async (publicId: string) => {
    try {
      const response = await fetch(`/api/propiedadesDetails/${publicId}`);
      console.log(response);
      if (!response.ok) {
        throw new Error("Error al obtener detalles de la propiedad");
      }
      const propertyDetails = await response.json();
      console.log(propertyDetails); // Agrega este log para verificar los detalles de la propiedad
      setPropertyDetails(propertyDetails);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDetailsClick = (publicId: string) => {
    fetchPropertyDetails(publicId);
  };

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
                <Button>
                  <Dialog>
                    <DialogTrigger
                      onClick={() => handleDetailsClick(item.public_id)}
                    >
                      <IoIosMore />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="m-3">{item.title}</DialogTitle>
                        <p className="m-3 text-gray-500">
                          {propertyDetails?.property_type} en{" "}
                          {propertyDetails?.location.name}
                        </p>
                        {propertyDetails && (
                          <Carousel className="w-full max-w-lg">
                            <CarouselContent>
                              {propertyDetails?.property_images.map(
                                (image: any, index: number) => (
                                  <CarouselItem key={index}>
                                    <div className="p-1 h-96">
                                      <img
                                        src={image.url}
                                        alt={`Image ${index}`}
                                        className="w-full h-full object-cover rounded-lg"
                                      />
                                    </div>
                                  </CarouselItem>
                                )
                              )}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                          </Carousel>
                        )}
                        <div className="flex flex-row">
                          <div className="flex items-center mr-4">
                            <FaBed className="w-5 h-4 mr-2" />
                            <span>{propertyDetails?.bedrooms || 0}</span>
                          </div>
                          <div className="flex items-center">
                            <FaBath className="w-4 h-4 mr-2" />
                            <span>{propertyDetails?.bathrooms || 0}</span>
                          </div>
                        </div>
                        <div className="flex items-center mr-4">
                          <TbResize className="w-5 h-4 mr-2" />
                          <span>
                            {propertyDetails?.lot_size?.toLocaleString() || 0}{" "}
                            m² de Terreno
                          </span>
                        </div>
                        <div className="flex items-center mr-4">
                          <RxRulerHorizontal className="w-5 h-4 mr-2" />
                          <span>
                            {propertyDetails?.lot_width?.toLocaleString() || 0}{" "}
                            m
                          </span>
                          <div className="flex items-center mr-4">
                            <RxRulerHorizontal className="w-5 h-4 mx-2 transform rotate-90" />
                            <span>
                              {propertyDetails?.lot_length?.toLocaleString() ||
                                0}{" "}
                              m
                            </span>
                          </div>
                        </div>

                        {propertyDetails && (
                          <DialogDescription>
                            <p className="font-bold text-base text-gray-800 py-2">
                              Descripción
                            </p>
                            {propertyDetails?.description}
                          </DialogDescription>
                        )}
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
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
