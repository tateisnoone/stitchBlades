import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LoginToComment = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-gray-50 dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700 mb-5">
      <p className="text-zinc-700 dark:text-zinc-300 text-center mb-4">
        You need to log in to leave a comment.
      </p>
      <Button
        onClick={handleLogin}
        className="w-full max-w-xs bg-[#6A0DAD] hover:bg-[#6a0dadb3]"
      >
        Log In
      </Button>
    </div>
  );
};

export default LoginToComment;
