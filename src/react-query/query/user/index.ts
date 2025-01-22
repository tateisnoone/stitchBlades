import { useQuery } from "@tanstack/react-query";
import { PROFILE_QUERY_KEY } from "./enum";
import { getProfileInfo } from "@/supabase/profile";

export const useProfileInfo = (id: string) => {
  return useQuery({
    queryKey: [PROFILE_QUERY_KEY.INFO],
    queryFn: () => getProfileInfo(id),
    enabled: !!id,
  });
};
