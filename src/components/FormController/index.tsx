"use client";

import { usePost } from "@/context/PostContext";
import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  registerName: string;
  isInvalidName: any;
  minLength?: any;
};

const FormController = ({ registerName, isInvalidName, minLength }: Props) => {
  const { register } = usePost();

  return (
    <FormControl isInvalid={!!isInvalidName}>
      <Input
        {...(registerName === "email"
          ? {
              ...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: `Invalid email address`,
                },
              }),
            }
          : {
              ...register(registerName, {
                required: `${
                  registerName.charAt(0).toUpperCase() + registerName.slice(1)
                } is required`,
                minLength: {
                  value: minLength,
                  message: `Write at least ${minLength} letters`,
                },
              }),
            })}
        placeholder={
          registerName.charAt(0).toUpperCase() + registerName.slice(1)
        }
        type={registerName}
      />
      <FormErrorMessage>
        {isInvalidName && (isInvalidName.message as ReactNode)}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormController;
