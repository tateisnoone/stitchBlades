import { PropsWithChildren, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
//import { useMutation } from "@tanstack/react-query";
//import { signUp } from "../../supabase/auth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "./schema";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/supabase/auth";

//import { DASHBOARD_PATHS } from "@/routes/dashboard/index.enum";

type FormValues = {
  email: string;
  password: string;
  confirm_password: string;
};

const DefaultValues = {
  email: "",
  password: "",
  confirm_password: "",
};
const Register: React.FC<PropsWithChildren> = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: handleRegister } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: signUp,
  });
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: DefaultValues,
  });

  const onSubmit = (values: FormValues) => {
    if (values.password !== values.confirm_password) {
      setAlertMessage("Passwords don't match!");
      return;
    }
    setAlertMessage(null);
    handleRegister(values);
    navigate("/registered");
    console.log("Form submitted successfully", values);
  };

  return (
    <div className="container lg mx-auto px-4 mt-8 mb-8  flex justify-center">
      <div className="w-[450px]  rounded-xl border-solid border border-zinc-200  dark:border-zinc-700 p-5 text-center bg-[#FFFFFF] dark:bg-[#1C1C1C]">
        <h1 className="text-2xl font-bold mb-2 text-[#03050C] dark:text-[#E5E5E5]">
          {t("register-page.Header")}
        </h1>
        <p className="text-sm mb-5 text-slate-700 dark:text-[#B0B0B0]">
          {t("register-page.Text")}
        </p>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="grid w-full items-center gap-3 mb-5">
            <Label
              htmlFor="fullname"
              className="text-left text-slate-900 font-body dark:text-[#B0B0B0]"
            >
              {t("register-page.Name")}
            </Label>
            <Controller
              control={control}
              name="fullname"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <>
                    <Input
                      type="text"
                      id="fullname"
                      placeholder="Full Name"
                      value={value}
                      onChange={onChange}
                      required
                    />
                    {error?.message ? (
                      <span className="text-[#8B0000] font-body">
                        {t("register-page.MinLength")}
                      </span>
                    ) : null}
                  </>
                );
              }}
            />
          </div> */}

          <div className="grid w-full items-center gap-3 mb-5">
            <Label
              htmlFor="email"
              className="text-left text-slate-900 font-body dark:text-[#B0B0B0]"
            >
              {t("register-page.Email")}
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
                      required
                    />
                    {error?.message ? (
                      <span className="text-[#8B0000] font-body">
                        {t("register-page.InvalidEmail")}
                      </span>
                    ) : null}
                  </>
                );
              }}
            />
          </div>

          {/* <div className="grid w-full items-center gap-3 mb-5">
            <Label
              htmlFor="username"
              className="text-left text-slate-900 font-body dark:text-[#B0B0B0]"
            >
              {t("register-page.UserName")}
            </Label>
            <Controller
              control={control}
              name="username"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <>
                    <Input
                      type="text"
                      id="username"
                      placeholder="Username"
                      value={value}
                      onChange={onChange}
                      required
                    />
                    {error?.message ? (
                      <span className="text-[#8B0000] font-body">
                        {t("register-page.InvalidUserName")}
                      </span>
                    ) : null}
                  </>
                );
              }}
            />
          </div> */}

          {/* Password Field */}
          <div className="grid w-full items-center gap-3 mb-5">
            <Label
              htmlFor="password"
              className="text-left text-slate-900 font-body dark:text-[#B0B0B0]"
            >
              {t("register-page.Password")}
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
                    required
                  />
                );
              }}
            />
          </div>

          <div className="grid w-full items-center gap-3 mb-5">
            <Label
              htmlFor="confirm"
              className="text-left text-slate-900 font-body dark:text-[#B0B0B0]"
            >
              {t("register-page.Confirm")}
            </Label>
            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { value, onChange } }) => {
                return (
                  <>
                    <Input
                      type="password"
                      id="confirm"
                      placeholder="Confirm Password"
                      value={value}
                      onChange={onChange}
                      required
                    />
                  </>
                );
              }}
            />
          </div>
          {alertMessage && (
            <span className="text-[#8B0000] font-body">
              {t("register-page.PasswordMatch")}
            </span>
          )}

          {/* Submit Button */}
          <Button
            className="bg-[#6A0DAD] hover:bg-[#6a0dadb3] text-base font-body dark:text-[#B0B0B0] w-full mb-5 mt-5"
            type="submit"
          >
            {t("register-page.Sign-Up")}
          </Button>
        </form>

        {/* Sign In Link */}
        <p className="text-sm text-slate-900 dark:text-[#B0B0B0]">
          {t("register-page.HaveAccount")} {""}
          <NavLink to="/login" className="text-[#6A0DAD] hover:underline">
            {t("register-page.Sign-In")}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
