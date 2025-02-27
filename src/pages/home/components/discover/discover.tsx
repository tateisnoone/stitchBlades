import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useGetPosts } from "@/react-query/query/posts";
import PostCard from "@/components/ui/outfit-card";
import { useDeletePost } from "@/react-query/mutation/posts";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { NavLink } from "react-router-dom";
import { formatCreatedAt } from "@/utils/date-utils";
import { USER_PATHS } from "@/routes/default-layout/user/index.enum";
import { useTranslation } from "react-i18next";

dayjs.extend(relativeTime);

const Discover = () => {
  const [user] = useAtom(userAtom);
  const { t } = useTranslation();
  const { data: postsData, refetch } = useGetPosts();
  const { mutate: deletePost } = useDeletePost();

  const userId = user?.user.id;

  const handleDelete = async (id: number) => {
    deletePost(id, {
      onSuccess: () => {
        toast(t("feed-page.PostDeleted"));
        refetch();
      },
      onError: () => {
        toast.error(t("feed-page.PostDeleteFailed"));
        refetch();
      },
    });
  };

  return (
    <>
      <div className="mt-4 text-center text-[38px]">
        <h1 className="font-title">{t("home-page.Discover")}</h1>
      </div>
      <div className="container lg mx-auto  mt-8 flex flex-wrap justify-between xs:justify-center lg:justify-start lg:gap-14 xl:justify-between xl:gap-5 gap-5">
        {postsData?.slice(0, 4).map((post) => {
          return (
            <>
              <PostCard
                key={post.id}
                post={post}
                userId={userId || ""}
                formatCreatedAt={formatCreatedAt}
                handleDelete={handleDelete}
                style={
                  "w-[290px]  hover:scale-105 hover:shadow-lg transition-all duration-300"
                }
              />
            </>
          );
        })}
        <NavLink to={USER_PATHS.FOR_FEED}>
          <Button className="bg-inherit border-none font-title text-black dark:text-white  text-2xl hover:bg-inherit hover:text-[28px] transition-all hidden lg:flex lg:self-center xl:hidden">
            {t("home-page.DiscoverButtonText")}
            <ArrowRight size={48} strokeWidth={2.25} />
          </Button>
        </NavLink>

        <div className="w-full flex justify-center mb-5">
          <NavLink to={USER_PATHS.FOR_FEED}>
            <Button className="bg-inherit border-none font-title text-black dark:text-white  text-2xl hover:bg-inherit hover:text-[28px] transition-all lg:hidden xl:flex">
              {t("home-page.DiscoverButton")}{" "}
              <ArrowRight size={48} strokeWidth={2.25} />
            </Button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Discover;
