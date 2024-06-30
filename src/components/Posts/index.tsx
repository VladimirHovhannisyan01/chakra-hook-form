"use client";

import { usePost } from "@/context/PostContext";
import { Box, Button, Text, VStack, HStack, Center } from "@chakra-ui/react";

const Posts = () => {
  const { postsValues, onDeleteHandler, onUpdateHandler } = usePost();

  return (
    <Center mb={10}>
      <VStack spacing={4} align="stretch" maxWidth="50vw">
        {postsValues.map((el) => (
          <Box
            key={el.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            boxShadow="sm"
          >
            <Text fontSize="xl" mb={4} whiteSpace={"pre"}>
              <b>{"Email.".padEnd(10)}</b>
              {el.email}
            </Text>
            <Text fontSize="xl" mb={4} whiteSpace={"pre"}>
              <b>{"Title.".padEnd(12)}</b>
              {el.title}
            </Text>
            <Text fontSize="xl" mb={4} whiteSpace={"pre"}>
              <b>{"Body.".padEnd(10)}</b>
              {el.body}
            </Text>
            <hr className="mt-5" />
            <HStack spacing={2} mt={5}>
              <Button colorScheme="blue" onClick={() => onUpdateHandler(el.id)}>
                Update
              </Button>
              <Button colorScheme="red" onClick={() => onDeleteHandler(el.id)}>
                Delete
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Center>
  );
};

export default Posts;
