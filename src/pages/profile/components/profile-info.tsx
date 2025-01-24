import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { userAtom } from "@/store/auth";
import { useAtom } from "jotai";
import defaultpfp from "@/assets/images/defaultpfp.webp";
import { EditProfile } from "./edit-profile";
import { useTranslation } from "react-i18next";
import ProfileInfoPlaceholder from "./profile-info-placeholder";
import { useProfileInfo } from "@/react-query/query/user";

const ProfileInfo = () => {
  const user = useAtom(userAtom);
  const { t } = useTranslation();
  const userId = user[0]?.user.id ?? "";
  const {
    data: profileData,
    isError,
    isLoading,
    refetch,
  } = useProfileInfo(userId);
  console.log(profileData);

  if (isError) return <p>Error loading profile info.</p>;

  return (
    <>
      {isLoading ? (
        <ProfileInfoPlaceholder />
      ) : (
        <div className="flex justify-center gap-5 mb-5 mt-9">
          <Card className="flex flex-col p-8 sm:size-[600px] sm:py-32 rounded-xl border-solid border-b border-zinc-200 bg-card text-card-foreground shadow  mb-5 sm:bg-[url('/src/assets/images/frame1.png')] sm:bg-no-repeat sm:bg-contain sm:dark:bg-[url('/src/assets/images/framewhite1.png')] ">
            <div className="flex flex-col  items-center mb-3 ">
              {" "}
              <CardHeader className="p-0 text-center mb-5">
                <CardTitle className="dark:text-white mb-3 font-title text-2xl">
                  {t("profile-page.Title")} {profileData?.full_name}
                </CardTitle>
                <CardDescription className="mb-3 font-body">
                  {t("profile-page.Text")}
                </CardDescription>
              </CardHeader>
              <div className="flex-col gap-10">
                <Avatar className="h-28 w-28 mb-5">
                  <AvatarImage
                    src={profileData?.avatar_url ?? undefined}
                    className="rounded-full border "
                  />
                  <AvatarFallback className="bg-white dark:bg-black">
                    <img src={defaultpfp} alt="" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardContent className="flex flex-col dark:text-white text-lg self-start">
                <h2>
                  {t("profile-page.FullName")}:{" "}
                  {profileData?.full_name
                    ? `「 ✦ ${profileData.full_name} ✦ 」`
                    : t("profile-page.AddName")}
                </h2>
                <h2>
                  {" "}
                  {t("profile-page.Username")}: {profileData?.username}
                </h2>
                <h2>
                  Birthday:{" "}
                  {profileData?.birthday
                    ? new Date(profileData.birthday).toLocaleDateString()
                    : t("profile-page.AddBirthday")}
                </h2>
                <h2> Gender: {profileData?.gender}</h2>
              </CardContent>
              <CardFooter className="p-0">
                <EditProfile refetch={refetch} />
              </CardFooter>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default ProfileInfo;
