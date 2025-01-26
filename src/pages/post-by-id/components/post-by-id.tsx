import { useGetComments, useGetPostById } from "@/react-query/query/posts";
import { useNavigate, useParams } from "react-router-dom";
import { formatCreatedAt } from "@/utils/date-utils";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ArrowLeft, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useAddComment,
  useDeletePost,
  useStitchPost,
} from "@/react-query/mutation/posts";
import { useState } from "react";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useProfileInfo } from "@/react-query/query/user";
import LoginToComment from "./log-in-to-comment";
import { USER_PATHS } from "@/routes/default-layout/user/index.enum";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SinglePost = () => {
  const user = useAtom(userAtom);
  const userId = user[0]?.user.id ?? "";
  const { postId } = useParams<{ postId: string }>();
  const { data: profileData } = useProfileInfo(userId);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const { mutate: stitchPost } = useStitchPost();
  const { mutate: addComment } = useAddComment();
  const { mutate: deletePost } = useDeletePost();

  const numericPostId = postId ? Number(postId) : undefined;
  const { data: post } = useGetPostById(numericPostId as number);
  const { data: postComment, refetch } = useGetComments(
    numericPostId as number,
  );

  if (!post) return <p>Post not found.</p>;

  const handleStitch = () => {
    if (!userId) {
      toast.error("You need to log in to stitch this post!");
      return;
    }

    stitchPost(
      { postId: Number(postId), userId },
      {
        onSuccess: () => {
          toast.success("You stitched this post!");
        },
        onError: (err) => {
          toast.error(`Error stitching post: ${err.message}`);
        },
      },
    );
  };

  const handleComment = () => {
    if (!userId) {
      toast.error("You need to log in to comment!");
      return;
    }

    if (!commentText.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    addComment(
      { postId: Number(postId), userId, comment_text: commentText },
      {
        onSuccess: () => {
          toast.success("Comment added!");
          setCommentText("");
          refetch();
        },
        onError: (err) => {
          toast.error(`Error adding comment: ${err.message}`);
        },
      },
    );
  };

  const handleDelete = async (id: number) => {
    deletePost(id, {
      onSuccess: () => {
        toast("Post has been deleted!");
        navigate(USER_PATHS.FOR_FEED);
      },
      onError: () => {
        toast.error(t("feed-page.PostDeleteFailed"));
      },
    });
  };

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
          <span className="font-title">Back</span>
        </Button>
      </div>

      {/* Post Card */}
      <Card className="rounded-lg border border-zinc-200 dark:border-zinc-700 flex flex-col h-full lg:flex-row lg:justify-between lg:h-[490px] lg:w-full pr-0">
        <CardHeader className="p-0 w-full lg:w-3/5 lg:h-full">
          <div
            className="w-full h-[450px] lg:h-full bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url(${postImageUrl})`,
            }}
          ></div>
        </CardHeader>
        <div className="flex flex-col lg:w-2/5 justify-between">
          <CardContent className="p-6">
            {/* Post Title */}
            <h1 className="text-2xl font-bold text-zinc-800 dark:text-white mb-2">
              {post?.title}
            </h1>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              By {post?.profiles?.username}, {formatCreatedAt(post.created_at)}
            </p>
            {/* Post Description */}
            <ScrollArea className="lg:h-[250px] rounded-md p-4">
              <p className="text-base text-zinc-700 dark:text-zinc-300 mb-4">
                {post?.description}
              </p>
            </ScrollArea>

            {/* Post Category */}
          </CardContent>

          {/* Footer */}
          <CardFooter className="p-6 justify-between">
            <Badge
              variant="outline"
              className="bg-[#EEF2FF] text-[#824ea2] dark:bg-[#f4eeff] dark:text-[#854ea2]"
            >
              {post?.category}
            </Badge>
            {userId === post.user_id ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex items-center justify-center rounded-lg border-solid border border-zinc-200 dark:border-zinc-700 w-20 h-10 p-1 bg-white dark:bg-black text-red-900">
                  <DropdownMenuItem
                    className="font-body text-sm cursor-pointer"
                    onClick={() => handleDelete(post.id)}
                  >
                    {t("feed-page.Delete")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {" "}
                    <div
                      className="bg-[url('/src/assets/images/stitchIconB.png')] bg-no-repeat bg-contain w-7 h-7 cursor-pointer dark:bg-[url('/src/assets/images/stitchIconW.png')]"
                      onClick={handleStitch}
                    ></div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Stitch</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </CardFooter>
        </div>
      </Card>

      {/* Comment Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-white mb-4">
          Comments
        </h2>

        {/* Add Comment */}
        {userId ? (
          <div className="flex items-start space-x-4 mb-6">
            <Avatar>
              <AvatarImage
                src={profileData?.avatar_url || ""}
                className="w-20"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex w-full gap-2 items-center">
              <Textarea
                placeholder="Write a comment..."
                className="mb-2"
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button
                className="text-sm bg-[#6A0DAD] hover:bg-[#6a0dadb3]"
                onClick={handleComment}
              >
                Add Comment
              </Button>
            </div>
          </div>
        ) : (
          <LoginToComment />
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {postComment?.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start space-x-4 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg"
            >
              <Avatar>
                <AvatarImage
                  src={comment?.profiles?.avatar_url || ""}
                  className="w-20"
                />
                <AvatarFallback>{comment?.profiles?.username}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-semibold text-zinc-800 dark:text-white">
                    {comment?.profiles?.username}
                  </h4>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {new Date(comment.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  {comment.comment_text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
