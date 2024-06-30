"use client";
import { Button, Flex, useColorMode } from "@chakra-ui/react";
import { FC } from "react";
import ModalComponent from "../ModalComponent";
import { usePost } from "@/context/PostContext";

const CreatePosts: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { onOpen } = usePost();

  return (
    <>
      <Button onClick={toggleColorMode} className="mr-auto box">
        {colorMode === "light" ? "🌙" : "☀️"}
      </Button>
      <Flex justifyContent={"Center"} mt={20} mb={10}>
        <Button onClick={onOpen}>Create Post</Button>
      </Flex>
      <ModalComponent />
    </>
  );
};

export default CreatePosts;
