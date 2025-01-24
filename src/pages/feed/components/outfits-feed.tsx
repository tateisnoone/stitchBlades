import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import { useDebounce } from "use-debounce";
import { useGetPostsBySearch } from "@/react-query/query/posts";
import dayjs from "dayjs";
import NoResults from "./no-results-found";
import PostLoadingPlaceholder from "./outfits-placeholder";
import PostCard from "@/components/ui/outfit-card";
import { useDeletePost } from "@/react-query/mutation/posts";
import { toast } from "sonner";
import { useState } from "react";
import { CategoryType } from "@/supabase/posts/index.types";
import CategoriesFilter from "./categories-filter";
import Sort from "./sort";
import SearchInput from "./search";
import { formatCreatedAt } from "@/utils/date-utils";

export type PostsFilterFormValues = {
  searchText: string;
};

const OutfitsFeed: React.FC = () => {
  const [user] = useAtom(userAtom);

  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | undefined
  >();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const { mutate: deletePost } = useDeletePost();
  const { control, watch } = useForm<PostsFilterFormValues>({
    defaultValues: qs.parse(searchParams.toString()) as PostsFilterFormValues,
  });
  const searchText = watch("searchText");
  const [debouncedSearchText] = useDebounce(searchText, 1000);
  const {
    data: postsData,
    isLoading,
    refetch,
  } = useGetPostsBySearch(debouncedSearchText, selectedCategory);

  const userId = user?.user.id;

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    const newSearchText = e.target.value;

    setSearchParams({ searchText: newSearchText });

    onChange(newSearchText);
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id, {
        onSuccess: () => {
          toast("Post has been deleted!");
          refetch();
        },
      });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  //
  const sortedPosts = postsData?.slice().sort((a, b) => {
    const dateA = dayjs(a.created_at);
    const dateB = dayjs(b.created_at);
    return sortOrder === "newest" ? dateB.diff(dateA) : dateA.diff(dateB);
  });

  // Paginated Posts

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-center sm:flex-row sm:justify-between gap-1">
        <CategoriesFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="px-4 mt-8 mb-8 font-sans flex flex-col w-full">
          <h1 className="text-2xl mb-2">Search Outfits</h1>
          <p className="mb-5 text-gray-500">
            You can stitch your favorite outfits by clicking on stitch icon
          </p>
          <div className="flex w-full justify-between">
            <SearchInput
              control={control}
              handleSearchChange={handleSearchChange}
            />

            <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} />
          </div>
          {isLoading ? (
            <PostLoadingPlaceholder />
          ) : (
            <div className="flex flex-wrap w-full justify-center gap-10 xl:justify-start ">
              {sortedPosts && sortedPosts.length > 0 ? (
                sortedPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    userId={userId || ""}
                    formatCreatedAt={formatCreatedAt}
                    handleDelete={handleDelete}
                    style={"w-[290px]"}
                  />
                ))
              ) : (
                <NoResults />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OutfitsFeed;
