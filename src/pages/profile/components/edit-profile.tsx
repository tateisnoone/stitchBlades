import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userAtom } from "@/store/auth";
import { useAtom } from "jotai";
import { useState } from "react";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUpdateProfileInfo } from "@/react-query/mutation/user";
import { toast } from "sonner";
import { FillProfileInfoPayload } from "@/supabase/profile/index.types";
import { USER_PATHS } from "@/routes/default-layout/user/index.enum";
import { useProfileInfo } from "@/react-query/query/user";

export const EditProfile: React.FC<{ refetch: () => void }> = ({ refetch }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const user = useAtom(userAtom);
  const userId = user[0]?.user.id ?? "";
  const { data: profileData } = useProfileInfo(userId);

  const navigate = useNavigate();
  const [gender, setGender] = useState<
    "Female" | "Male" | "Non-Binary" | "Prefer Not To Say" | null | undefined
  >(null);
  const [date, setDate] = useState<Date>();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FillProfileInfoPayload>({
    defaultValues: {
      full_name: profileData?.full_name || "",
      username: profileData?.username || "",
    },
  });

  const { mutate: handleProfileInfo } = useUpdateProfileInfo();

  const genders = ["Female", "Male", "Non-Binary", "Prefer Not To Say"];
  const avatars = [
    {
      label: "Chase",
      url: createAvatar(lorelei, { seed: "Chase" }).toDataUri(),
    },
    {
      label: "Ryker",
      url: createAvatar(lorelei, { seed: "Ryker" }).toDataUri(),
    },
    {
      label: "Christian",
      url: createAvatar(lorelei, { seed: "Christian" }).toDataUri(),
    },
  ];
  const handleAvatarSelect = (selectedAvatarUrl: string) => {
    setAvatarUrl(selectedAvatarUrl);
  };
  const handleGenderSelect = (
    selectedGender: "Female" | "Male" | "Non-Binary" | "Prefer Not To Say",
  ) => {
    setGender(selectedGender);
  };

  const onSubmit = (fieldValues: FillProfileInfoPayload) => {
    handleProfileInfo(
      {
        ...fieldValues,
        avatar_url: avatarUrl,
        gender: gender,
        id: userId,
        birthday: date,
      },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          refetch();
          navigate(USER_PATHS.FOR_PROFILE);
          toast("Profile info has been updated!");
        },
        onError: () => {
          <p>Something went wrong!</p>;
        },
      },
    );
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-body">
          {t("profile-page.EditProfile")} ᖭི༏ᖫྀ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="font-body">
          <DialogTitle> {t("profile-page.EditProfile")}</DialogTitle>
          <DialogDescription>{t("profile-page.EditText")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 p-0">
            <div className="grid grid-cols-4 items-center gap-4 p-0">
              <Label htmlFor="name" className="text-right font-body">
                {t("profile-page.FullName")}
              </Label>
              <Input
                id="name"
                {...register("full_name", {
                  required: t("sign-up.NameRequired"),
                  minLength: {
                    value: 3,
                    message: t("sign-up.MinLength"),
                  },
                })}
                className="col-span-3"
              />
              {errors.full_name?.message && (
                <span className="text-red-500">
                  {typeof errors.full_name.message === "string"
                    ? errors.full_name.message
                    : t("sign-up.MinLength")}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right font-body">
                {t("profile-page.Username")}
              </Label>
              <Input
                id="username"
                {...register("username", {
                  required: t("sign-up.NameRequired"),
                  minLength: {
                    value: 3,
                    message: t("sign-up.MinLength"),
                  },
                })}
                className="col-span-3"
              />
              {errors.username?.message && (
                <span className="text-red-500">
                  {typeof errors.username.message === "string"
                    ? errors.username.message
                    : t("sign-up.MinLength")}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right font-body">
                {t("profile-page.Birthday")}
              </Label>
              {/* Date Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "PPP")
                    ) : (
                      <span> {t("profile-page.PickDate")}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center justify-start gap-4 mb-5">
              <Label htmlFor="picture" className="font-body ml-9 mr-1">
                {t("profile-page.Gender")}
              </Label>
              <Select onValueChange={handleGenderSelect}>
                <SelectTrigger className="w-full font-body">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent className="font-body">
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-start gap-4 mb-5">
              <Label htmlFor="picture" className="font-body ml-9 mr-1">
                {t("profile-page.Avatar")}
              </Label>
              <Select onValueChange={handleAvatarSelect}>
                <SelectTrigger className="w-full font-body">
                  <SelectValue placeholder="Choose Avatar" />
                </SelectTrigger>
                <SelectContent className="font-body">
                  {avatars.map((avatar) => (
                    <SelectItem key={avatar.url} value={avatar.url}>
                      {avatar.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <DialogFooter>
              <Button type="submit" className="font-body">
                {t("profile-page.SaveChanges")}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
