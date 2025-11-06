import { Skeleton } from "@/components/ui/skeleton";

const YouTubeSectionSkeleton = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/2 space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="w-full h-60 rounded-xl" />
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>
            <div className="flex gap-4 mt-6">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
          <div className="lg:w-1/2 space-y-6">
            <Skeleton className="w-40 h-6 rounded-md" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full mt-4" />
            <Skeleton className="h-12 w-48 mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSectionSkeleton;