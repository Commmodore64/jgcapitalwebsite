import { FC } from "react";

//Utils
import { Button } from "@/components/ui/button";
import { Image } from "@nextui-org/react";
import Link from "next/link";

const stadistics = [
  {
    title: "Propiedades",
    value: "100+",
  },
  {
    title: "Clientes",
    value: "100+",
  },
  {
    title: "Años de experiencia",
    value: "5+",
  },
];

const hero: FC = ({}) => {
  return (
    <>
      <div className="relative h-full w-full bg-white">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="relative isolate pt-14">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto flex flex-col justify-center">
              <div className="flex flex-col ml-8">
                <h1 className="p-1.5 text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-l from-gray-400 to-black">
                  Encuentra una casa que se ajuste a ti
                </h1>
                <h2 className="text-lg text-gray-500 mt-3 ml-1.5">
                  Quieres encontrar un hogar? Estamos listos para ayudarte
                </h2>
              </div>
              <Button className="ml-10 mt-7 w-28">
                <Link href="/propiedadesBusqueda">Inicia</Link>
              </Button>
              <div className="flex h-0 mt-24 ml-12">
                {stadistics.map((statistic, index) => (
                  <div key={index} className="flex flex-col mr-6">
                    <h3 className="text-3xl font-bold">{statistic.value}</h3>
                    <p className="ml-2 text-gray-500">{statistic.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <Image
              isBlurred
              width={900}
              src="https://www.glazz.co.uk/wp-content/uploads/2018/09/Amazing-Modern-House-Designs-HD-Wallpaper.jpg"
              alt="NextUI Album Cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default hero;
