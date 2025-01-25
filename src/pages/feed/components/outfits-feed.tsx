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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink,
} from "@/components/ui/pagination";
import { useTranslation } from "react-i18next";

export type PostsFilterFormValues = {
  searchText: string;
};

const OutfitsFeed: React.FC = () => {
  const [user] = useAtom(userAtom);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
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
          toast(t("feed-page.PostDeleted"));
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
  const postsPerPage = 9;
  const totalPosts = sortedPosts?.length || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const paginatedPosts = sortedPosts?.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-center sm:flex-row sm:justify-between gap-1">
        <CategoriesFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="px-4 mt-8 mb-8 font-sans flex flex-col w-full">
          <h1 className="text-2xl mb-2">{t("feed-page.Title")}</h1>
          <p className="mb-5 text-gray-500">{t("feed-page.Text")}</p>
          <div className="flex w-full justify-start gap-2 h-20 items-center">
            <SearchInput
              control={control}
              handleSearchChange={handleSearchChange}
            />

            <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} />
          </div>
          {isLoading ? (
            <PostLoadingPlaceholder />
          ) : (
            <>
              <div className="flex flex-wrap w-full justify-center gap-10 xl:justify-start">
                {paginatedPosts && paginatedPosts.length > 0 ? (
                  paginatedPosts.map((post) => (
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
              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          href="#"
                          onClick={() => setCurrentPage(index + 1)}
                          className={
                            index + 1 === currentPage ? "font-bold" : ""
                          }
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages),
                          )
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OutfitsFeed;
