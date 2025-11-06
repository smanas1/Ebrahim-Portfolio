import { Skeleton } from "@/components/ui/skeleton";

const GlobalReachSkeleton = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 relative">
            <Skeleton className="w-full h-[400px] rounded-2xl" />
          </div>
          <div className="lg:w-1/2 space-y-8">
            <Skeleton className="w-32 h-6 rounded-md" />
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center p-4">
                  <Skeleton className="h-8 w-24 mx-auto" />
                  <Skeleton className="h-4 w-16 mx-auto mt-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalReachSkeleton;