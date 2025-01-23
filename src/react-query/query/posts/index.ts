import { useQuery } from "@tanstack/react-query";
import { POSTS_QUERY_KEY } from "./enum";
import { getPosts, getPostsBySearch } from "@/supabase/posts";
import { CategoryType } from "@/supabase/posts/index.types";

export const useGetPosts = () => {
  return useQuery({
    queryKey: [POSTS_QUERY_KEY.POSTS],
    queryFn: getPosts,
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
