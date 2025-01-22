import { supabase } from "..";
import { FillProfileInfoPayload } from "./index.types";

export const fillProfileInfo = async (payload: FillProfileInfoPayload) => {
  const formattedPayload = {
    ...payload,
    birthday: payload.birthday
      ? payload.birthday.toLocaleDateString("en-CA") // Format as YYYY-MM-DD (ISO 8601)
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
