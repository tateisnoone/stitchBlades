import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Post } from "@/supabase/posts/index.types";

interface PostCardProps {
  post: Post;
  userId: string;
  formatCreatedAt: (createdAt: string) => string;
  handleDelete: (postId: number) => void; // Change to number
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  userId,
  formatCreatedAt,
  handleDelete,
}) => {
  const postImageUrl = post?.image_url
    ? `${import.meta.env.VITE_SUPABASE_OUTFIT_IMAGES_STORAGE_URL}/${post?.image_url}`
    : "";

  return (
    <Card
      key={post.id}
      className="rounded-lg border-solid border-b border-zinc-200 dark:border-zinc-700 h-[429px] mb-5 w-[290px]"
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
        <CardTitle className="font-body flex justify-between text-md">
          {post?.title}
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
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="bg-[url('/src/assets/images/stitchIconB.png')] bg-no-repeat bg-contain dark:bg-[url('/src/assets/images/stitchIconW.png')] size-7 cursor-pointer"></div>
          )}
        </CardTitle>

        <CardDescription>
          {post?.profiles?.username}, {formatCreatedAt(post.created_at)}
        </CardDescription>
        <p className="text-sm">{post?.description}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3">
        <Badge
          variant="outline"
          className="bg-[#EEF2FF] text-[#824ea2] dark:bg-[#f4eeff] dark:text-[#854ea2]"
        >
          {post.category}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
