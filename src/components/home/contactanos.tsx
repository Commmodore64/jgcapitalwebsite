import { ValidationError, useForm } from "@formspree/react";
import { Card, Input } from "@nextui-org/react";
import { FC } from "react";
import { Button } from "../ui/button";

const Contactanos: FC = () => {
  const [state, handleSubmit] = useForm("xqkrqorz");

  return (
    <>
      <div className="flex justify-center my-8">
        <Card className="w-[300px] p-8">
          <p className="text-xl font-bold pb-2">Contactanos</p>
          <p className="text-md">¿Necesitas algo en especial?</p>
          <form onSubmit={handleSubmit} className="mt-4">
            <Input
              id="email"
              type="email"
              name="email"
              label="Email Address"
              className="mb-4"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <Input
              id="message"
              name="message"
              label="Your Message"
              className="mb-4 pb-4"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <Button
              type="submit"
              disabled={state.submitting}
              className=" text-white px-4 py-2 rounded-md"
            >
              Submit
            </Button>
          </form>
        </Card>
      </div>
      <p className="flex justify-start text-gray-700 p-2 pb-4">
        @ Copyright 2024 - All rights reserved.
      </p>
    </>
  );
};

export default Contactanos;
