import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { FC } from "react";

const nosotros: FC = ({}) => {
  return (
    <>
      <div className="flex justify-center items-center h-full w-full bg-white my-8">
        <Card className="w-[750px] bg-white text-[#101010] mx-7">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-xl font-bold">¿Quiénes somos?</p>
              <p className="text-small font-semibold text-default-700">
                JG Capital Bienes{" "}
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          {/* <Divider />
           <CardFooter>
            {/* <Link
              isExternal
              showAnchorIcon
              href="https://github.com/nextui-org/nextui"
            >
              Visit source code on GitHub.
            </Link> 
          </CardFooter> */}
        </Card>
      </div>
    </>
  );
};
export default nosotros;
