import { useMutation } from "@tanstack/react-query";
import { WRITE_MUTATION_KEY } from "./enum";
import { createPost, deletePost } from "@/supabase/posts";
import { CategoryType } from "@/supabase/posts/index.types";

export const useCreatePost = () => {
  return useMutation({
    mutationKey: [WRITE_MUTATION_KEY.CREATE_POST_WITH_IMAGE],
    mutationFn: ({
      imageFile,
      formValues,
      userId,
    }: {
      imageFile: File;
      formValues: {
        title: string;
        description: string;
        category: CategoryType;
      };
      userId: string;
    }) => createPost(imageFile, formValues, userId),
  });
};

export const useDeletePost = () => {
  return useMutation({
    mutationKey: [WRITE_MUTATION_KEY.DELETE_POST],
    mutationFn: deletePost,
  });
};
