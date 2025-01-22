import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen text-white">
        <div className="text-center p-8 rounded-lg shadow-lg dark:bg-white max-w-md w-full">
          <h1 className="text-6xl text-[#8B0000]">404</h1>
          <p className="mt-4 text-xl text-gray-700 dark:text-black">
            Ooops! (っ‘ω`c) The page you're looking for cannot be found 𓉸ྀི
          </p>
          <Button
            onClick={handleGoHome}
            className="mt-6 bg-[#6A0DAD] hover:bg-purple-700 text-white px-6 py-2 rounded-lg focus:outline-none font-body"
          >
            Go to Homepage
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
