import { logout } from "@/supabase/auth";
import { useMutation } from "@tanstack/react-query";
import { PROFILE_MUTATION_KEY } from "./enum";
import { fillProfileInfo } from "@/supabase/profile";
import { useNavigate } from "react-router-dom";

export const useUpdateProfileInfo = () => {
  return useMutation({
    mutationKey: [PROFILE_MUTATION_KEY.UPDATE_PROFILE_INFO],
    mutationFn: fillProfileInfo,
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [PROFILE_MUTATION_KEY.LOGOUT],
    mutationFn: logout,
    onSuccess: () => navigate("/"),
  });
};
