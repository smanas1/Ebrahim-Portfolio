import { Skeleton } from "@/components/ui/skeleton";

const WhyChooseMeSkeleton = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 space-y-6">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
              ))}
            </div>
            <Skeleton className="h-12 w-full rounded-lg" />
            <div className="pt-4">
              <Skeleton className="h-12 w-36" />
            </div>
          </div>
          <div className="lg:w-1/2">
            <Skeleton className="w-full h-80 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMeSkeleton;