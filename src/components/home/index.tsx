// Types
import type { FC } from "react";

// Components
import Contactanos from "./contactanos";
import Hero from "./hero";
import Nosotros from "./nosotros";
import Propiedades from "./propiedades";

const Index: FC = ({}) => {
  const componentsArray = [
    { id: "hero", component: <Hero /> },
    { id: "propiedades", component: <Propiedades /> },
    { id: "nosotros", component: <Nosotros /> },
    { id: "contactanos", component: <Contactanos /> },
  ];

  return (
    <>
      {componentsArray.map((component, key) => {
        return (
          <section key={`${component.id} with key: ${key}`}>
            {component.component}
          </section>
        );
      })}
    </>
  );
};
export default Index;
