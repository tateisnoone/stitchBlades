import { login, logout, signUp } from "@/supabase/auth";
import { useMutation } from "@tanstack/react-query";
import { PROFILE_MUTATION_KEY } from "./enum";
import { fillProfileInfo } from "@/supabase/profile";
import { useNavigate } from "react-router-dom";
import { STATIC_PATHS } from "@/routes/default-layout/static/index.enum";
import { USER_PATHS } from "@/routes/default-layout/user/index.enum";

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
    onSuccess: () => navigate(STATIC_PATHS.FOR_HOME),
  });
};
export const useRegister = () => {
  return useMutation({
    mutationKey: [PROFILE_MUTATION_KEY.REGISTER],
    mutationFn: signUp,
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [PROFILE_MUTATION_KEY.LOGIN],
    mutationFn: login,
    onSuccess: () => navigate(USER_PATHS.FOR_PROFILE),
  });
};
