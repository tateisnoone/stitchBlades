import { supabase } from "..";
import { FillProfileInfoPayload } from "./index.types";

export const fillProfileInfo = async (payload: FillProfileInfoPayload) => {
  const formattedPayload = {
    ...payload,
    birthday: payload.birthday
      ? payload.birthday.toLocaleDateString("en-CA")
      : null,
  };
  return supabase.from("profiles").upsert(formattedPayload).throwOnError();
};

export const getProfileInfo = async (
  id: string,
): Promise<FillProfileInfoPayload | null> => {
  if (id === "") return null;
  try {
    const response = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
    if (response.error) {
      throw new Error(response.error.message);
    }
    return {
      ...response.data,
      birthday: response.data.birthday
        ? new Date(response.data.birthday)
        : null,
    };
  } catch (error) {
    throw new Error(`Failed to fetch profile info: ${error}`);
  }
};

// export const getUserStitchedPosts = async (
//   userId: string,
// ): Promise<Stitches[]> => {
//   try {
//     const { data, error } = await supabase
//       .from("stitched_posts")
//       .select(
//         "*, outfit_posts(title, description,image_url,category,created_at)",
//       )
//       .eq("stitched_by", userId);

//     if (error) {
//       throw new Error(error.message);
//     }
//     return data || [];
//   } catch (error) {
//     throw new Error(`Failed to fetch user stitched posts: ${error}`);
//   }
// };
