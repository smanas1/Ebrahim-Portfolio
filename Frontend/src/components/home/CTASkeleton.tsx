import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CTASkeleton = () => {
  return (
    <Card className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <CardContent className="flex flex-col md:flex-row items-center justify-between gap-8 text-center">
        <div className="flex-1">
          <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </div>
        <div className="flex-1">
          <Skeleton className="h-12 w-full max-w-xs mx-auto" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CTASkeleton;