import { supabase } from "..";
import { CategoryType, Post, PostComment, Stitches } from "./index.types";

export const getPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("outfit_posts")
    .select("*, profiles!outfit_posts_user_id_fkey(username)");
  if (error) {
    throw new Error(error.message);
  }
  return data || [];
};

export const getPostById = async (postId: number): Promise<Post | null> => {
  try {
    const { data, error } = await supabase
      .from("outfit_posts")
      .select("*, profiles!outfit_posts_user_id_fkey(username)")
      .eq("id", postId)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data || null;
  } catch (error) {
    throw new Error(`Failed to fetch post by ID: ${error}`);
  }
};

export const getComments = async (postId: number): Promise<PostComment[]> => {
  try {
    const { data, error } = await supabase
      .from("post_comments")
      .select("*, profiles(username, avatar_url)")
      .eq("post_id", postId);
    if (error) {
      throw new Error(error.message);
    }
    return data || [];
  } catch (error) {
    throw new Error(`Failed to fetch comments: ${error}`);
  }
};

export const getStitches = async (postId: number): Promise<Stitches[]> => {
  try {
    const { data, error } = await supabase
      .from("stitched_posts")
      .select("*")
      .eq("post_id", postId);
    if (error) {
      throw new Error(error.message);
    }
    return data || [];
  } catch (error) {
    throw new Error(`Failed to fetch stitches: ${error}`);
  }
};

export const StitchPost = async (postId: number, userId: string) => {
  try {
    const { data, error } = await supabase
      .from("stitched_posts")
      .insert([{ stitched_post: postId, stitched_by: userId }]);

    if (error) {
      throw new Error(error.message);
    }
    return data || [];
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error}`);
  }
};

export const AddComment = async (
  userId: string,
  postId: number,
  comment_text: string,
) => {
  try {
    const { data, error } = await supabase
      .from("post_comments")
      .insert([
        { post_id: postId, user_id: userId, comment_text: comment_text },
      ]);

    if (error) {
      throw new Error(error.message);
    }
    return data || [];
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error}`);
  }
};

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
    throw new Error(`Failed to fetch posts: ${error}`);
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
      throw new Error(error.message);
    }
    return data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
