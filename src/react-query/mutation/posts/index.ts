import { useMutation } from "@tanstack/react-query";
import { POSTS_MUTATION_KEY } from "./enum";
import {
  AddComment,
  createPost,
  deletePost,
  StitchPost,
} from "@/supabase/posts";
import { CategoryType } from "@/supabase/posts/index.types";

export const useCreatePost = () => {
  return useMutation({
    mutationKey: [POSTS_MUTATION_KEY.CREATE_POST_WITH_IMAGE],
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
    mutationKey: [POSTS_MUTATION_KEY.DELETE_POST],
    mutationFn: deletePost,
  });
};
export const useAddComment = () => {
  return useMutation({
    mutationKey: [POSTS_MUTATION_KEY.ADD_COMMENT],
    mutationFn: ({
      userId,
      postId,
      comment_text,
    }: {
      userId: string;
      postId: number;
      comment_text: string;
    }) => AddComment(userId, postId, comment_text),
  });
};

export const useStitchPost = () => {
  return useMutation({
    mutationKey: [POSTS_MUTATION_KEY.STITCH_POST],
    mutationFn: ({ postId, userId }: { postId: number; userId: string }) =>
      StitchPost(postId, userId),
  });
};
