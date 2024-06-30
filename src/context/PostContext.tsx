"use client";

import { useDisclosure } from "@chakra-ui/react";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  useForm,
} from "react-hook-form";

interface Post {
  email: string;
  title: string;
  body: string;
  id: number;
}

interface PostContextType {
  postsValues: Post[];
  onUpdateHandler: (id: number) => void;
  onDeleteHandler: (postId: number) => void;
  addPostHandler: (data: any) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  reset: UseFormReset<FieldValues>;
  update: number | null;
  setValue: UseFormSetValue<FieldValues>;
  currentPost: Post | null;
}

export const PostContext = createContext<PostContextType | undefined>(
  undefined
);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [postsValues, setPostsValues] = useState<Post[]>([]);
  const [update, setUpdate] = useState<number | null>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onBlur",
  });
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  useEffect(() => {
    if (update !== null) {
      const postToEdit = postsValues.find((post) => post.id === update);
      if (postToEdit) {
        setCurrentPost(postToEdit);
        setValue("email", postToEdit.email);
        setValue("title", postToEdit.title);
        setValue("body", postToEdit.body);
      }
    } else {
      setCurrentPost(null);
      reset();
    }
  }, [update, postsValues, setValue, reset]);

  const addPostHandler = (data: any) => {
    if (!data.email && !data.title && !data.body) return;

    if (update !== null) {
      setPostsValues((prev: any) =>
        prev.map((item: any) =>
          item.id === update
            ? {
                ...item,
                email: data.email,
                title: data.title,
                body: data.body,
              }
            : item
        )
      );
      setUpdate(null);
    } else {
      setPostsValues((prev: any) => [
        {
          email: data.email,
          title: data.title,
          body: data.body,
          id: Date.now(),
        },
        ...prev,
      ]);
    }
  };

  const onUpdateHandler = (id: number) => {
    onOpen();
    setUpdate(id);
  };

  const onDeleteHandler = (postId: number) => {
    setPostsValues((prev: any) => prev.filter((el: any) => el.id !== postId));
  };

  return (
    <PostContext.Provider
      value={{
        postsValues,
        onUpdateHandler,
        addPostHandler,
        onDeleteHandler,
        isOpen,
        onClose,
        onOpen,
        handleSubmit,
        register,
        errors,
        reset,
        setValue,
        update,
        currentPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};
