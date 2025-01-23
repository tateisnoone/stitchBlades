import { supabase } from "..";
import { CategoryType, Post } from "./index.types";

export const getPosts = async (): Promise<Post[]> => {
  try {
    const { data, error } = await supabase
      .from("outfit_posts")
      .select("*, profiles!outfit_posts_user_id_fkey(username)");
    if (error) {
      throw new Error(error.message);
    }
    return data || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error(`Failed to fetch posts: ${error}`);
  }
};

// export const getPostsById

export const createPost = async (
  imageFile: File,
  formValues: {
    title: string;
    description: string;
    category: CategoryType;
  },
  userId: string,
) => {
  if (!imageFile) {
    throw new Error("Image file is required.");
  }
  try {
    const imageUploadResult = await supabase.storage
      .from("outfit_image")
      .upload(imageFile.name, imageFile);

    if (imageUploadResult.error) {
      throw new Error(imageUploadResult.error.message);
    }

    const postInsertResult = await supabase.from("outfit_posts").insert({
      title: formValues.title,
      description: formValues.description,
      category: formValues.category,
      image_url: imageUploadResult.data?.fullPath,
      user_id: userId,
    });

    if (postInsertResult.error) {
      throw new Error(postInsertResult.error.message);
    }

    return postInsertResult.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const deletePost = async (id: number) => {
  try {
    const { data: post, error: fetchError } = await supabase
      .from("outfit_posts")
      .select("image_url")
      .eq("id", id)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    if (post?.image_url) {
      const imagePath = post.image_url.replace("outfit_image/", "");
      const { error: deleteImageError } = await supabase.storage
        .from("outfit_image")
        .remove([imagePath]);
      console.log("post image:", post.image_url);
      if (deleteImageError) {
        throw new Error(deleteImageError.message);
      }
    }

    const { data, error: deleteError } = await supabase
      .from("outfit_posts")
      .delete()
      .eq("id", id);

    if (deleteError) {
      throw new Error(deleteError.message);
    }

    return data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error(
      `Failed to delete blog: ${error instanceof Error ? error.message : error}`,
    );
  }
};

export const getPostsBySearch = async (
  search: string | number | null,
  category?: CategoryType,
): Promise<Post[] | []> => {
  try {
    const query = supabase
      .from("outfit_posts")
      .select("*, profiles!outfit_posts_user_id_fkey(username)");
    if (search) {
      query.ilike("title", `%${search}%`);
    }
    if (category) {
      query.eq("category", category);
    }
    const { data, error } = await query;
    if (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
    return data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
