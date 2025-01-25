import { useQuery } from "@tanstack/react-query";
import { POSTS_QUERY_KEY } from "./enum";
import {
  getComments,
  getPostById,
  getPosts,
  getPostsBySearch,
  getStitches,
} from "@/supabase/posts";
import { CategoryType } from "@/supabase/posts/index.types";

export const useGetPosts = () => {
  return useQuery({
    queryKey: [POSTS_QUERY_KEY.POSTS],
    queryFn: getPosts,
  });
};
export const useGetComments = (postId: number) => {
  return useQuery({
    queryKey: [POSTS_QUERY_KEY.POST_COMMENTS, postId],
    queryFn: () => getComments(postId),
  });
};

export const useGetStitches = (postId: number) => {
  return useQuery({
    queryKey: [POSTS_QUERY_KEY.POST_STITCHES, postId],
    queryFn: () => getStitches(postId),
  });
};
export const useGetPostsBySearch = (
  debouncedSearchText: string | number | null,
  selectedCategory?: CategoryType,
) => {
  return useQuery({
    queryKey: [
      POSTS_QUERY_KEY.POSTS_BY_SEARCH,
      debouncedSearchText,
      selectedCategory,
    ],
    queryFn: () => getPostsBySearch(debouncedSearchText, selectedCategory),
  });
};

// export const useGetUserStitchedPosts = (userId: string) => {
//   return useQuery({
//     queryKey: [POSTS_QUERY_KEY.USER_STITCHED_POSTS, userId],
//     queryFn: () => getUserStitchedPosts(userId),
//   });
// };

export const useGetPostById = (postId: number) => {
  return useQuery({
    queryKey: [POSTS_QUERY_KEY.POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};
