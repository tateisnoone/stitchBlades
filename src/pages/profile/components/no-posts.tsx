import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NoPosts = () => {
  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate("/create");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center py-10">
      <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full p-4">
        <Info className="w-12 h-12 text-gray-500 dark:text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
        No Posts Available
      </h2>
      <p className="text-gray-500 dark:text-gray-400">
        It looks like there are no posts yet. Create one to get started!
      </p>
      <Button onClick={handleCreatePost} className="mt-4">
        Create a Post
      </Button>
    </div>
  );
};

export default NoPosts;
