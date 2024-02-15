import { useEffect, useState } from "react";
import { FaBath, FaBed, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
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

function PropertySearchResults({ properties }: { properties: Array<object> }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-12">
      {properties.map((item, index) => (
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
  );
}

function PropertySearch() {
  const [searchCriteria, setSearchCriteria] = useState({
    ventaRenta: "", // Opciones: 'sale', 'rental', ''
    type: "", // Opciones: 'Terreno', 'Casa', 'Departamento', ''
  });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Solo hacer la llamada a la API si se ha realizado una búsqueda
    if (Object.values(searchCriteria).some((val) => val !== "")) {
      fetchData();
    }
  }, [searchCriteria]);

  const fetchData = async () => {
    try {
      setLoading(true); // Establecer loading en true al iniciar la búsqueda
      const response = await fetch(`/api/propiedadesApi`);
      if (!response.ok) {
        throw new Error("Error al obtener datos de la API");
      }
      const data = await response.json();
      // Filtrar las propiedades según los criterios de búsqueda
      const filteredProperties = data.content.filter((property) => {
        // Verificar si la propiedad coincide con los criterios de búsqueda
        const ventaRentaMatch =
          searchCriteria.ventaRenta === "" ||
          property.operations.some(
            (operation) => operation.type === searchCriteria.ventaRenta
          );
        const typeMatch =
          searchCriteria.type === "" ||
          property.property_type === searchCriteria.type;
        return ventaRentaMatch && typeMatch;
      });
      setProperties(filteredProperties);
      setLoading(false); // Establecer loading en false al finalizar la búsqueda
    } catch (error) {
      console.error(error);
      setLoading(false); // Asegurar que loading se establezca en false en caso de error
    }
  };

  const handleInputChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Buscar Propiedades</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex-grow">
            <label htmlFor="ventaRenta" className="block font-semibold">
              Tipo de venta:
            </label>
            <select
              id="ventaRenta"
              name="ventaRenta"
              value={searchCriteria.ventaRenta}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Seleccionar</option>
              <option value="sale">Venta</option>
              <option value="rental">Renta</option>
            </select>
          </div>
          <div className="flex-grow">
            <label htmlFor="type" className="block font-semibold">
              Tipo de propiedad:
            </label>
            <select
              id="type"
              name="type"
              value={searchCriteria.type}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Seleccionar</option>
              <option value="Terreno">Terreno</option>
              <option value="Casa">Casa</option>
              <option value="Departamento">Departamento</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Buscar
        </button>
      </form>
      {loading ? (
        <p>Cargando...</p>
      ) : properties.length > 0 ? (
        // Mostrar resultados en forma de tarjetas si hay propiedades
        <PropertySearchResults properties={properties} />
      ) : (
        // Mostrar mensaje de no hay resultados si no hay propiedades
        <p>
          No se encontraron propiedades que coincidan con los criterios de
          búsqueda.
        </p>
      )}
    </div>
  );
}

export default PropertySearch;
