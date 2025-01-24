import { useGetPostById } from "@/react-query/query/posts";
import { useParams } from "react-router-dom";
import { formatCreatedAt } from "@/utils/date-utils";
// import { useAddComment, useDeletePost } from "@/react-query/mutation/posts";
// import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SinglePost = () => {
  const { postId } = useParams<{ postId: string }>(); // Get post ID from the URL
  const { data: post, isLoading, error } = useGetPostById(Number(postId)); // Fetch post details
  // const { mutate: deletePost } = useDeletePost();
  // const { mutate: addComment } = useAddComment();
  // const navigate = useNavigate();

  if (isLoading) return <p>Loading post...</p>;
  if (error) return <p>Error loading post: {error.message}</p>;
  if (!post) return <p>Post not found.</p>;
  // const handleDelete = async (id: number) => {
  //   try {
  //     await deletePost(id, {
  //       onSuccess: () => {
  //         toast("Post has been deleted!");
  //         navigate("/feed");
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error deleting post:", error);
  //   }
  // };

  // const handleAddComment = async (
  //   userId: string,
  //   postId: number,
  //   comment_text: string,
  // ) => {
  //   addComment({ userId, postId, comment_text });
  // };

  const postImageUrl = post?.image_url
    ? `${import.meta.env.VITE_SUPABASE_OUTFIT_IMAGES_STORAGE_URL}/${post?.image_url}`
    : "";

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex-col justify-between">
      {/* Back Button */}
      <div className="mb-4">
        <Button
          variant="ghost"
          className="flex items-center space-x-2"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Button>
      </div>

      {/* Post Card */}
      <Card className="rounded-lg border border-zinc-200 dark:border-zinc-700 flex h-[490px]">
        <CardHeader className="p-0 w-1/2 h-full">
          <div
            className="w-full h-full bg-cover bg-center rounded-t-lg"
            style={{
              backgroundImage: `url(${postImageUrl})`,
            }}
          ></div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Post Title */}
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-white mb-2">
            {post?.title}
          </h1>

          {/* Post Metadata */}
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            By {post?.profiles?.username}, {formatCreatedAt(post.created_at)}
          </p>
          {/* Post Description */}
          <p className="text-base text-zinc-700 dark:text-zinc-300 mb-4">
            {post?.description}
          </p>
          {/* Post Category */}
          <Badge
            variant="outline"
            className="bg-[#EEF2FF] text-[#824ea2] dark:bg-[#f4eeff] dark:text-[#854ea2]"
          >
            {post?.category}
          </Badge>
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-6">
          <div
            className="bg-[url('/src/assets/images/stitchIconB.png')] bg-no-repeat bg-contain w-7 h-7 cursor-pointer dark:bg-[url('/src/assets/images/stitchIconW.png')]"
            onClick={() => console.log("Stitch/Like post")}
          ></div>
        </CardFooter>
      </Card>

      {/* Comment Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-white mb-4">
          Comments
        </h2>

        {/* Add Comment */}
        <div className="flex items-start space-x-4 mb-6">
          <Avatar>
            <AvatarImage src="/avatar-placeholder.png" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Write a comment..."
              className="mb-2"
              rows={3}
            />
            <Button className="text-sm">Add Comment</Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {/* {post.comments?.map((comment: any) => (
            <div
              key={comment.id}
              className="flex items-start space-x-4 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg"
            >
              <Avatar>
                <AvatarImage
                  src={comment.profiles.avatar_url}
                  alt="User Avatar"
                />
                <AvatarFallback>{comment.profiles.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-semibold text-zinc-800 dark:text-white">
                    {comment.profiles.username}
                  </h4>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {new Date(comment.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  {comment.content}
                </p>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
