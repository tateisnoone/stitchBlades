import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetPosts } from "@/react-query/query/posts";
import { userAtom } from "@/store/auth";
import { useAtom } from "jotai";
import dayjs from "dayjs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDeletePost } from "@/react-query/mutation/posts";
import NoPosts from "./no-posts";
import { toast } from "sonner";
import PostCard from "@/components/ui/outfit-card";

const ProfileTabs = () => {
  const user = useAtom(userAtom);
  const userId = user[0]?.user.id ?? "";
  const { data: postsData, refetch } = useGetPosts();
  //const postUserId = postsData?.[1]?.user_id;
  //console.log("postuserid:", postUserId);
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
              {postsData && postsData.length > 0 ? (
                postsData.some((post) => post.user_id === userId) ? (
                  postsData.map((post) =>
                    post.user_id === userId ? (
                      <PostCard
                        key={post.id}
                        post={post}
                        userId={userId || ""}
                        formatCreatedAt={formatCreatedAt}
                        handleDelete={handleDelete}
                        style={"w-full"}
                      />
                    ) : null,
                  )
                ) : (
                  <NoPosts />
                )
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
