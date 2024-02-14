import { useEffect, useState } from "react";

function PropertySearch() {
  const [searchCriteria, setSearchCriteria] = useState({
    ventaRenta: "", // Opciones: 'sale', 'rental', ''
    type: "", // Opciones: 'Terreno', 'Casa', 'Departamento', ''
  });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [searchCriteria]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/propiedadesApi`);
      if (!response.ok) {
        throw new Error("Error al obtener datos de la API");
      }
      const data = await response.json();
      // Filtrar las propiedades según los criterios de búsqueda
      const filteredProperties = data.content.filter((property: any) => {
        // Verificar si la propiedad coincide con los criterios de búsqueda
        const ventaRentaMatch =
          searchCriteria.ventaRenta === "" ||
          property.operations.some(
            (operation: any) => operation.type === searchCriteria.ventaRenta
          );
        const typeMatch =
          searchCriteria.type === "" ||
          property.property_type === searchCriteria.type;
        return ventaRentaMatch && typeMatch;
      });
      setProperties(filteredProperties);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      ) : (
        <div>
          {properties.length > 0 ? (
            <div>
              {/* Aquí puedes mostrar las propiedades filtradas */}
              {properties.map((property, index) => (
                <div key={index}>{JSON.stringify(property)}</div>
              ))}
            </div>
          ) : (
            <p>
              No se encontraron propiedades que coincidan con los criterios de
              búsqueda.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default PropertySearch;
