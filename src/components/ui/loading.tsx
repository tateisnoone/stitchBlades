import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 5));
    }, 5);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md flex flex-col justify-center items-center">
        <h2 className="text-xl font-title mb-4 text-center">Loading...</h2>
        <Progress value={progress} className="mb-4 h-3" />
      </div>
    </div>
  );
};

export default Loader;
