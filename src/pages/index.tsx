// Types
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

// Utils
import Head from "next/head";

// Components
import HomeComponent from "../components/home";
export default function Home() {
  return (
    <>
      <Head>
        <title>JG - Inicio</title>
        {/* TODO: Description */}
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar>
        <NavbarBrand>
          {/* <img
            src="https://s3.amazonaws.com/assets.moveglobally.com/organization_files/54254/logo_jg_mejorado_-_Copy.png"
            className=""
            alt=""
          /> */}
          <p className="font-semibold text-inherit">JGCapital</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-24" justify="center">
          <NavbarItem>
            <Link href="#" aria-current="page" className="font-thin">
              Inicio
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#" className="font-thin">
              Propiedades
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#" className="font-thin">
              Nosotros
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#" className="font-thin">
              Contactanos
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem> */}
        </NavbarContent>
      </Navbar>
      <HomeComponent />
    </>
  );
}
