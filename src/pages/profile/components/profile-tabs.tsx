import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetPosts } from "@/react-query/query/posts";
import { userAtom } from "@/store/auth";
import { useAtom } from "jotai";
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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

import { useDeletePost } from "@/react-query/mutation/posts";
import NoPosts from "./no-posts";
import { toast } from "sonner";

const ProfileTabs = () => {
  const user = useAtom(userAtom);
  const userId = user[0]?.user.id ?? "";
  const { data: postsData, refetch } = useGetPosts();
  const postUserId = postsData?.[0]?.user_id;
  console.log("postuserid:", postUserId);
  const formatCreatedAt = (createdAt: string) => {
    const now = dayjs();
    const postDate = dayjs(createdAt);
    if (now.diff(postDate, "day") < 1) {
      return postDate.fromNow();
    } else {
      return postDate.format("HH:mm - DD/MM/YYYY");
    }
  };
  const { mutate: deletePost } = useDeletePost();

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

  return (
    <>
      <div className="flex justify-center items-center mb-10">
        <Tabs defaultValue="myPosts">
          <TabsList className="xs:w-[250px] ss:w-[400px] sm:w-[600px] ">
            <TabsTrigger value="myPosts" className="w-1/2">
              My Posts
            </TabsTrigger>
            <TabsTrigger value="stitchedPosts" className="w-1/2">
              Stitched Posts{" "}
              <div className="bg-[url('/src/assets/images/stitchIconB.png')] bg-no-repeat bg-contain dark:bg-[url('/src/assets/images/stitchIconW.png')] size-5 cursor-pointer ml-2"></div>
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="myPosts"
            className="xs:w-[250px] ss:w-[400px] sm:w-[600px]"
          >
            <ScrollArea className="h-[500px] rounded-md border p-4">
              {userId === postUserId ? (
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
                        className={`rounded-lg border-solid border-b border-zinc-200 dark:border-zinc-700 h-[429px] mb-5`}
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
                            <DropdownMenu>
                              <DropdownMenuTrigger>...</DropdownMenuTrigger>
                              <DropdownMenuContent className=" flex items-center justify-center rounded-lg border-solid border border-zinc-200 dark:border-zinc-700 w-20 h-10 p-1 bg-white dark:bg-black text-red-900">
                                <DropdownMenuItem
                                  className="font-body text-sm cursor-pointer"
                                  onClick={() => handleDelete(post.id)}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </CardTitle>

                          <CardDescription>
                            <NavLink to={""} className="hover:underline">
                              {post?.profiles?.username || "Unknown User"}
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
                })
              ) : (
                <NoPosts />
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent
            value="stitchedPosts"
            className="xs:w-[250px] ss:w-[400px] sm:w-[600px]"
          >
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProfileTabs;
