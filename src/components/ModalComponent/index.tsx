"use client";
import { usePost } from "@/context/PostContext";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import FormController from "../FormController";

const ModalComponent: FC = () => {
  const {
    addPostHandler,
    onClose,
    isOpen,
    reset,
    errors,
    handleSubmit,
    update,
  } = usePost();

  const createPost: SubmitHandler<any> = (data: any) => {
    addPostHandler(data);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{update ? "Update" : "Create"} Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            onSubmit={handleSubmit(createPost)}
            className="flex flex-col gap-5"
          >
            <FormController registerName="email" isInvalidName={errors.email} />
            <FormController
              registerName="title"
              isInvalidName={errors.title}
              minLength={5}
            />
            <FormController
              registerName="body"
              isInvalidName={errors.body}
              minLength={10}
            />
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                {update ? "Update" : "Create"}
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  reset();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
