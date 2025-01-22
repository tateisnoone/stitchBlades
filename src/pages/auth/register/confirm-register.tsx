import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmailConfirmationPage = () => {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="max-w-md w-full text-center border border-solid border-zinc-300 shadow-md rounded-lg p-6">
        <div className="flex items-center justify-center  rounded-full p-4 ">
          <Mail className="w-12 h-12 text-[#6A0DAD]" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Check Your Email
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          A confirmation email has been sent to your mail. Please check your
          inbox and follow the instructions to verify your account.
        </p>

        <Button
          variant="ghost"
          className="border border-zinc-300"
          onClick={handleNavigateToLogin}
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default EmailConfirmationPage;
