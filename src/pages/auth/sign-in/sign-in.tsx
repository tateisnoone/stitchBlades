import { PropsWithChildren } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "./schema";
import { useLogin } from "@/react-query/mutation/user";
import { AUTH_PATHS } from "@/routes/default-layout/auth/index.enum";
import { toast } from "sonner";

type FormValues = {
  email: string;
  password: string;
};

const DefaultValues = {
  email: "",
  password: "",
};
const LogIn: React.FC<PropsWithChildren> = () => {
  const { t } = useTranslation();
  const { mutate: handleLogin, isError } = useLogin();
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: DefaultValues,
  });

  const onSubmit = (values: FormValues) => {
    handleLogin(values, {
      onSuccess: () => {
        toast.success("Login successful!");
      },
      onError: (err) => {
        const errorMessage = err?.message || "Login failed. Please try again.";
        toast.error(errorMessage, {
          style: {
            backgroundColor: "#8B0000",
            color: "#ffffff",
          },
        });
      },
    });
  };

  return (
    <div className="container lg mx-auto px-4 mt-8 mb-8  flex justify-center">
      <div className="w-[450px]  rounded-xl border-solid border border-zinc-200  dark:border-zinc-700 p-5 text-center bg-[#FFFFFF] dark:bg-[#1C1C1C]">
        <h1 className="text-2xl font-bold mb-2 text-[#03050C] dark:text-[#E5E5E5]">
          {t("sign-in.Header")}
        </h1>
        <p className="text-sm mb-5 text-slate-700 dark:text-[#B0B0B0]">
          {t("sign-in.Text")}
        </p>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-3 mb-5">
            <Label
              htmlFor="email"
              className="text-left text-slate-900 font-body dark:text-[#B0B0B0]"
            >
              {t("sign-in.Email")}
            </Label>
            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <>
                    <Input
                      type="text"
                      id="email"
                      placeholder="Email"
                      value={value}
                      onChange={onChange}
                    />
                    {error && (
                      <span className="text-[#8B0000]">{error.message}</span>
                    )}
                  </>
                );
              }}
            />
          </div>

          {/* Password Field */}
          <div className="grid w-full items-center gap-3 mb-5">
            <Label
              htmlFor="password"
              className="text-left text-slate-900 font-body dark:text-[#B0B0B0]"
            >
              {t("sign-in.Password")}
            </Label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => {
                return (
                  <Input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={value}
                    onChange={onChange}
                  />
                );
              }}
            />
          </div>
          {isError ? (
            <span className="text-[#8B0000]">
              Invalid email or password. Please try again
            </span>
          ) : null}
          {/* Submit Button */}
          <Button
            className="bg-[#6A0DAD] hover:bg-[#6a0dadb3] text-base font-body dark:text-[#B0B0B0] w-full mb-5 mt-5"
            type="submit"
          >
            {t("sign-in.Log-In")}
          </Button>
        </form>

        {/* Sign In Link */}
        <p className="text-sm text-slate-900 dark:text-[#B0B0B0]">
          {t("sign-in.HaveAccount")} {""}
          <NavLink
            to={AUTH_PATHS.FOR_REGISTER}
            className="text-[#6A0DAD] hover:underline"
          >
            {t("sign-in.Sign-Up")}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
