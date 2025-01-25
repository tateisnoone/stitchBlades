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
import { ArrowRight, Ellipsis } from "lucide-react";
import { Post } from "@/supabase/posts/index.types";
import { truncateText } from "@/utils/string-utils";
import { Button } from "./button";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface PostCardProps {
  post: Post;
  userId: string;
  formatCreatedAt: (createdAt: string) => string;
  handleDelete: (postId: number) => void;
  style: string;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  userId,
  formatCreatedAt,
  handleDelete,
  style,
}) => {
  const { t } = useTranslation();
  const postImageUrl = post?.image_url
    ? `${import.meta.env.VITE_SUPABASE_OUTFIT_IMAGES_STORAGE_URL}/${post?.image_url}`
    : "";

  return (
    <Card
      key={post.id}
      className={`rounded-lg border-solid border-b border-zinc-200 dark:border-zinc-700 h-[440px] mb-5 ${style}`}
    >
      <CardHeader className="p-0">
        <div
          className="w-full h-[280px] overflow-hidden mb-4 bg-cover bg-center rounded-t-sm"
          style={{
            backgroundImage: `url(${postImageUrl})`,
          }}
        ></div>
      </CardHeader>
      <CardContent className="pb-0 h-20 mb-3">
        <CardTitle className="font-body flex justify-between text-md">
          {truncateText(post?.title ?? "", 25)}
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
            <div className="bg-[url('/src/assets/images/stitchIconB.png')] bg-no-repeat bg-contain dark:bg-[url('/src/assets/images/stitchIconW.png')] size-7 cursor-pointer"></div>
          )}
        </CardTitle>

        <CardDescription>
          {post?.profiles?.username}, {formatCreatedAt(post.created_at)}
        </CardDescription>
        <p className="text-sm">{truncateText(post?.description ?? "", 55)}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between">
        <Badge
          variant="outline"
          className="bg-[#EEF2FF] text-[#824ea2] dark:bg-[#f4eeff] dark:text-[#854ea2]"
        >
          {post.category}
        </Badge>
        <NavLink to={`/post/${post.id}`}>
          <Button className="bg-inherit border-none font-body text-black dark:text-white  text-sm hover:bg-inherit hover:text-[#6A0DAD] dark:hover:text-[#6A0DAD] transition-all">
            {t("feed-page.Details")}
            <ArrowRight size={48} strokeWidth={2.25} />
          </Button>
        </NavLink>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
