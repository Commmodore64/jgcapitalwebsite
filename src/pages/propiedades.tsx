// Importando los componentes necesarios
import Head from "next/head";
import PropiedadesAll from "../components/propiedades/propiedadesAll";

export default function Propiedades() {
  // Retornando la estructura de la página
  return (
    <>
      <Head>
        <title>JG - Propiedades</title>
      </Head>
      <PropiedadesAll />
    </>
  );
}
