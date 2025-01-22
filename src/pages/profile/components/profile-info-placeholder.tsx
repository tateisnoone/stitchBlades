import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar } from "@radix-ui/react-avatar";

const ProfileInfoPlaceholder = () => {
  return (
    <div className="flex justify-center gap-5 mb-48 mt-9">
      <Card className="flex flex-col py-24 px-12 xs:w-[250px] xs:h-[250px] ss:w-[400px] ss:h-[400px] sm:w-[500px] sm:h-[500px] 2xl:w-[600px] 2xl:h-[600px] 2xl:py-32 rounded-xl border-solid border-b border-zinc-200 bg-card text-card-foreground shadow mb-5 bg-[url('/src/assets/frame1.png')] bg-no-repeat bg-contain dark:bg-[url('/src/assets/framewhite1.png')]">
        <div className="flex flex-col items-center mb-3">
          <CardHeader className="p-0 text-center mb-5">
            <CardTitle className="dark:text-white mb-3 font-title text-2xl">
              <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
            </CardTitle>
            <CardDescription className="mb-3 font-body">
              <div className="h-4 w-72 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
            </CardDescription>
          </CardHeader>
          <div className="flex-col gap-10">
            <Avatar className="h-28 w-28 mb-5">
              <div className="h-full w-full rounded-full border bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            </Avatar>
          </div>
          <CardContent className="flex flex-col dark:text-white text-lg self-start">
            <h2>
              <span className="h-4 w-64 bg-gray-300 dark:bg-gray-700 animate-pulse rounded inline-block"></span>
            </h2>
            <h2>
              <span className="h-4 w-40 bg-gray-300 dark:bg-gray-700 animate-pulse rounded inline-block"></span>
            </h2>
          </CardContent>
          <CardFooter>
            <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default ProfileInfoPlaceholder;
