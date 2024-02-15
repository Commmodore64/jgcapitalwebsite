// Importando los componentes necesarios
import Head from "next/head";
import PropiedadesSearch from "../components/propiedades/propiedadBusqueda";

export default function PropiedadesBusqueda() {
  // Retornando la estructura de la página
  return (
    <>
      <Head>
        <title>JG - Propiedades</title>
      </Head>
      <PropiedadesSearch />
    </>
  );
}
