import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createFormSchema } from "./schema";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreatePost } from "@/react-query/mutation/posts";
import { categories } from "./categories";
import { CategoryType } from "@/supabase/posts/index.types";
import { toast } from "sonner";

type FormValues = {
  title: string;
  description: string;
  category: CategoryType;
  image_url: File | null;
};

const defaultValues: FormValues = {
  title: "",
  description: "",
  category: "" as CategoryType,
  image_url: null,
};

const CreatePostForm = () => {
  const { t } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const user = useAtom(userAtom);
  const userId = user[0]?.user.id ?? "";

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(createFormSchema),
    defaultValues,
  });
  const { mutate: createPost } = useCreatePost();

  const onSubmit = async (formValues: FormValues) => {
    if (!formValues.image_url) {
      toast.error("Image file is required.");
      return;
    }

    createPost(
      {
        imageFile: formValues.image_url,
        formValues: {
          title: formValues.title,
          description: formValues.description,
          category: formValues.category,
        },
        userId,
      },
      {
        onSuccess: () => {
          toast.success("Post created successfully!");
          setShowAlert(true);
          reset();
        },
        onError: (err) => {
          toast.error(
            err?.message || "Post couldn't be created. Please try again.",
            {
              style: {
                backgroundColor: "#8B0000",
                color: "#ffffff",
              },
            },
          );
        },
      },
    );
  };

  return (
    <div className="container lg mx-auto px-4 mt-8 mb-8 flex justify-center">
      <div className="w-[450px] rounded-xl border-solid border border-zinc-200 dark:border-zinc-700 p-5 text-center bg-white dark:bg-[#1C1C1C]">
        <h1 className="text-2xl font-bold mb-2 text-[#03050C] dark:text-[#E5E5E5]">
          {t("create-post.Create")}
        </h1>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="grid w-full items-center gap-3 mb-5">
            <Label
              htmlFor="title"
              className="text-left text-slate-900 dark:text-[#B0B0B0]"
            >
              {t("create-post.Title")}
            </Label>
            <Controller
              control={control}
              name="title"
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    type="text"
                    id="title"
                    placeholder={t("create-post.TitlePlaceholder")}
                    {...field}
                  />
                  {error && (
                    <span className="text-[#8B0000]">{error.message}</span>
                  )}
                </>
              )}
            />
          </div>

          {/* Description */}
          <div className="grid w-full items-center gap-3 mb-5">
            <Label
              htmlFor="description"
              className="text-left text-slate-900 dark:text-[#B0B0B0]"
            >
              {t("create-post.Description")}
            </Label>
            <Controller
              control={control}
              name="description"
              render={({ field, fieldState: { error } }) => (
                <>
                  <Textarea
                    id="description"
                    placeholder={t("create-post.Describe")}
                    {...field}
                    className="resize-none"
                  />
                  {error && (
                    <span className="text-[#8B0000]">{error.message}</span>
                  )}
                </>
              )}
            />
          </div>

          {/* Category */}
          <div className="grid w-full items-center gap-3 mb-5">
            <Label
              htmlFor="category"
              className="text-left text-slate-900 dark:text-[#B0B0B0]"
            >
              {t("create-post.Category")}
            </Label>
            <Controller
              name="category"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="h-10 border">
                      <SelectValue
                        placeholder={t("create-post.CategoryPlaceholder")}
                      />
                    </SelectTrigger>
                    <SelectContent className="text-sans">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {error && (
                    <span className="text-[#8B0000] text-sm mt-1 block">
                      {error.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          {/* Image */}
          <div className="grid w-full items-center gap-3 mb-5">
            <Label
              htmlFor="image_url"
              className="text-left text-slate-900 dark:text-[#B0B0B0]"
            >
              {t("create-post.UploadImg")}
            </Label>
            <Controller
              control={control}
              name="image_url"
              render={({ field: { onChange }, fieldState: { error } }) => {
                return (
                  <>
                    <Input
                      type="file"
                      id="image"
                      placeholder="File"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file);
                      }}
                      accept=".jpg,.jpeg,.png,.webp"
                      className="bg-inherit border-none p-0 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 h-full"
                    />
                    {error && (
                      <span className="text-[#8B0000]">{error.message}</span>
                    )}
                  </>
                );
              }}
            />
          </div>

          {/* Submit Button */}
          <Button
            className="bg-[#6A0DAD] hover:bg-[#6a0dadb3] text-base font-body w-full mb-5 mt-5 dark:text-white"
            type="submit"
          >
            *ੈ✩‧₊˚༺ {t("create-post.Post")} ༻*ੈ✩‧₊˚
          </Button>
        </form>
        {showAlert && (
          <Alert className="bg-green-100">
            <AlertTitle className="font-lg dark:text-black">
              † ཐི{t("create-post.PostAdded")}ཋྀ †
            </AlertTitle>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default CreatePostForm;
