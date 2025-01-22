import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGetPosts } from "@/react-query/query/posts";

dayjs.extend(relativeTime);

const Discover = () => {
  const { data: postsData } = useGetPosts();
  const formatCreatedAt = (createdAt: string) => {
    const now = dayjs();
    const postDate = dayjs(createdAt);
    if (now.diff(postDate, "day") < 1) {
      return postDate.fromNow();
    } else {
      return postDate.format("HH:mm - DD/MM/YYYY");
    }
  };

  return (
    <>
      <div className="mt-4 text-center text-[40px]">
        <h1>Discover Outfits</h1>
      </div>
      <div className="container lg mx-auto  mt-8 flex flex-wrap justify-between xs:justify-center lg:justify-start lg:gap-14 xl:justify-between xl:gap-5 gap-5">
        {postsData?.slice(0, 4).map((post) => {
          const postImageUrl = post?.image_url
            ? `${import.meta.env.VITE_SUPABASE_OUTFIT_IMAGES_STORAGE_URL}/${
                post?.image_url
              }`
            : "";
          return (
            <>
              <Card
                key={post.id}
                className={`rounded-lg border-solid border-b border-zinc-200 dark:border-zinc-700 bg-card text-card-foreground h-[429px] w-[292px] cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300`}
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
                  <CardTitle className="font-body">{post?.title}</CardTitle>
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
                    className="bg-[#EEF2FF] text-[#4E53A2] dark:bg-[#EEF2FF] dark:text-[#4E53A2] rounded-xl"
                  >
                    {post.category}
                  </Badge>
                </CardFooter>
              </Card>
            </>
          );
        })}
        <Button className="bg-inherit border-none font-title text-black dark:text-white  text-2xl hover:bg-inherit hover:text-[28px] transition-all hidden lg:flex lg:self-center xl:hidden">
          You can check out more outfits here
          <ArrowRight size={48} strokeWidth={2.25} />
        </Button>
        <div className="w-full flex justify-center mb-5">
          <Button className="bg-inherit border-none font-title text-black dark:text-white  text-2xl hover:bg-inherit hover:text-[28px] transition-all lg:hidden xl:flex">
            See More <ArrowRight size={48} strokeWidth={2.25} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Discover;
