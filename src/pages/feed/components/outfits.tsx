import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useSearchParams } from "react-router-dom";
import qs from "qs";
import { useDebounce } from "use-debounce";
import { categories } from "@/pages/create-post/components/categories";
import { useGetPostsBySearch } from "@/react-query/query/posts";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import { Command } from "@/components/ui/command";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import NoResults from "./no-results-found";

export type PostsFilterFormValues = {
  searchText: string;
};

const OutfitsFeed: React.FC = () => {
  const [user] = useAtom(userAtom);
  const userId = user?.user.id;
  //

  const [searchParams, setSearchParams] = useSearchParams();
  //
  const { control, watch } = useForm<PostsFilterFormValues>({
    defaultValues: qs.parse(searchParams.toString()) as PostsFilterFormValues,
  });
  const searchText = watch("searchText");
  //
  const [debouncedSearchText] = useDebounce(searchText, 1000);
  //
  const {
    data: postsData,
    isLoading,
    isError,
  } = useGetPostsBySearch(debouncedSearchText);
  //
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  //
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    const newSearchText = e.target.value;

    //იმისთვის რომ url ში ჩავწეროთ path
    setSearchParams({ searchText: newSearchText });
    //
    onChange(newSearchText);
  };
  //
  return (
    <>
      <div className="container lg mx-auto px-4 flex flex-col justify-center sm:flex-row sm:justify-between gap-10">
        <Accordion
          type="single"
          collapsible
          className="w-full sm:w-[170px] sm:border-r"
        >
          <AccordionItem
            value="item-1"
            className="w-full mt-10 flex flex-col items-center"
          >
            <AccordionTrigger className="font-title text-2xl flex gap-5 border-b mr-10">
              Categories <ChevronDown size={24} strokeWidth={1.25} />
            </AccordionTrigger>
            {categories.map((category) => (
              <AccordionContent
                key={category}
                className="font-body mt-5 self-start"
              >
                {category}
              </AccordionContent>
            ))}
          </AccordionItem>
        </Accordion>

        <div className="px-4 mt-8 mb-8 font-sans flex flex-col">
          <h1 className="text-2xl mb-5">Search Outfits</h1>
          <Command className="rounded-lg border shadow-md mb-10 w-full dark:border-solid dark:border-neutral-800">
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

          <div className="flex flex-wrap w-full justify-center lg:justify-between  lg:gap-2">
            {postsData && postsData.length > 0 ? (
              postsData?.map((post) => {
                const postImageUrl = post?.image_url
                  ? `${import.meta.env.VITE_SUPABASE_OUTFIT_IMAGES_STORAGE_URL}/${
                      post?.image_url
                    }`
                  : "";
                return (
                  <>
                    <Card
                      key={post.id}
                      className={`rounded-lg border-solid border-b border-zinc-200 dark:border-zinc-700 h-[429px] mb-5 w-[290px]`}
                    >
                      <CardHeader className="p-0">
                        <div
                          className="w-full h-[280px] overflow-hidden mb-4 bg-cover bg-center rounded-t-sm"
                          style={{
                            backgroundImage: `url(${postImageUrl})`,
                          }}
                        ></div>
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="font-body flex justify-between">
                          {post?.title}
                          {userId === post.user_id ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger>...</DropdownMenuTrigger>
                              <DropdownMenuContent className=" flex items-center justify-center rounded-lg border-solid border border-zinc-200 dark:border-zinc-700 w-20 h-10 p-1 bg-white dark:bg-black text-red-900">
                                <DropdownMenuItem className="font-body text-sm cursor-pointer">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          ) : (
                            <div className="bg-[url('/src/assets/images/stitchIconB.png')] bg-no-repeat bg-contain dark:bg-[url('/src/assets/images/stitchIconW.png')] size-7 cursor-pointer"></div>
                          )}
                        </CardTitle>

                        <CardDescription>
                          <NavLink to={""} className="hover:underline">
                            {post?.profiles?.username},
                          </NavLink>{" "}
                          {formatCreatedAt(post.created_at)}
                        </CardDescription>
                        <p className="text-lg">{post?.description}</p>
                      </CardContent>
                      <CardFooter className="flex flex-wrap gap-3">
                        <Badge
                          variant="outline"
                          className="bg-[#EEF2FF] text-[#824ea2] dark:bg-[#f4eeff] dark:text-[#854ea2] "
                        >
                          {post.category}
                        </Badge>
                      </CardFooter>
                    </Card>
                  </>
                );
              })
            ) : (
              <NoResults />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OutfitsFeed;
