import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import { useDebounce } from "use-debounce";
import { categories } from "@/pages/create-post/components/categories";
import { useGetPostsBySearch } from "@/react-query/query/posts";
import dayjs from "dayjs";
import { Command } from "@/components/ui/command";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NoResults from "./no-results-found";
import PostLoadingPlaceholder from "./outfits-placeholder";
import PostCard from "@/components/ui/outfit-card";
import { useDeletePost } from "@/react-query/mutation/posts";
import { toast } from "sonner";
import { useState } from "react";
import { CategoryType } from "@/supabase/posts/index.types";

export type PostsFilterFormValues = {
  searchText: string;
};

const OutfitsFeed: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | undefined
  >();
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate: deletePost } = useDeletePost();
  const { control, watch } = useForm<PostsFilterFormValues>({
    defaultValues: qs.parse(searchParams.toString()) as PostsFilterFormValues,
  });
  const searchText = watch("searchText");
  const [debouncedSearchText] = useDebounce(searchText, 1000);
  const {
    data: postsData,
    isLoading,
    isError,
    refetch,
  } = useGetPostsBySearch(debouncedSearchText, selectedCategory);

  //
  const userId = user?.user.id;
  const formatCreatedAt = (createdAt: string) => {
    const now = dayjs();
    const postDate = dayjs(createdAt);
    if (now.diff(postDate, "day") < 1) {
      return postDate.fromNow();
    } else {
      return postDate.format("HH:mm - DD/MM/YYYY");
    }
  };
  //

  if (isError) {
    return <div>Error</div>;
  }

  //
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    const newSearchText = e.target.value;

    setSearchParams({ searchText: newSearchText });
    //
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

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-center sm:flex-row sm:justify-between gap-1">
        <Accordion
          type="single"
          collapsible
          className="w-full mt-4 px-4 sm:w-[170px] sm:border-r md:w-[250px]"
        >
          <AccordionItem value="item-1" className="w-full">
            <AccordionTrigger className="font-title text-2xl flex gap-1 mr-5">
              Categories
            </AccordionTrigger>
            {categories.map((category) => (
              <AccordionContent>
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`font-body category-button ${
                    selectedCategory === category
                      ? "text-[#6A0DAD] font-bold"
                      : ""
                  }`}
                >
                  {category}
                </button>
              </AccordionContent>
            ))}
          </AccordionItem>
        </Accordion>

        <div className="px-4 mt-8 mb-8 font-sans flex flex-col w-full">
          <h1 className="text-2xl mb-5">Search Outfits</h1>
          <Command className="rounded-lg border shadow-md mb-10 w-full dark:border-solid dark:border-neutral-800 h-10">
            <Controller
              name="searchText"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <input
                    onChange={(e) => handleSearchChange(e, onChange)}
                    value={value}
                    placeholder="Enter search text..."
                    className="h-10 p-2 shadow-md dark:bg-inherit font-body"
                  />
                );
              }}
            />
          </Command>

          {isLoading ? (
            <PostLoadingPlaceholder />
          ) : (
            <div className="flex flex-wrap w-full justify-center gap-10 xl:justify-start ">
              {postsData && postsData.length > 0 ? (
                postsData?.map((post) => {
                  return (
                    <>
                      <PostCard
                        key={post.id}
                        post={post}
                        userId={userId || ""}
                        formatCreatedAt={formatCreatedAt}
                        handleDelete={handleDelete}
                        style={"w-[290px]"}
                      />
                    </>
                  );
                })
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
