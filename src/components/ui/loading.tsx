import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "./progress";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="p-6 shadow-xl">
        <CardContent className="flex flex-col items-center space-y-4">
          {/* Spinner */}
          <Progress className="h-12 w-12" />

          {/* Loading Text */}
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Loading, please wait...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingPage;
