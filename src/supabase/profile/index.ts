import { supabase } from "..";
import { FillProfileInfoPayload } from "./index.types";

export const fillProfileInfo = async (payload: FillProfileInfoPayload) => {
  return supabase.from("profiles").upsert(payload).throwOnError();
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
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch profile info: ${error}`);
  }
};
