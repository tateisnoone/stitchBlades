import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const PostLoadingPlaceholder: React.FC = () => {
  return (
    <div className="flex flex-wrap w-full justify-center lg:justify-between lg:gap-2">
      {Array(12)
        .fill(0)
        .map((_, index) => (
          <Card
            key={index}
            className="rounded-lg border-solid border-b border-zinc-200 dark:border-zinc-700 h-[429px] mb-5 w-[290px]"
          >
            <CardHeader className="p-0">
              <Skeleton className="w-full h-[280px] rounded-t-sm" />
            </CardHeader>
            <CardContent>
              <CardTitle className="font-body flex justify-between">
                <Skeleton className="w-[150px] h-6" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-[100px] h-4" />
              </CardDescription>
              <Skeleton className="w-full h-5 mt-2" />
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
              <Badge variant="outline">
                <Skeleton className="w-20 h-5" />
              </Badge>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default PostLoadingPlaceholder;
