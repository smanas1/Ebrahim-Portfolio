import { Skeleton } from "@/components/ui/skeleton";

const AboutMeSkeleton = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-100 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 relative">
            <Skeleton className="w-full aspect-square rounded-2xl" />
          </div>
          <div className="lg:w-1/2 space-y-6">
            <Skeleton className="w-24 h-6 rounded-md" />
            <Skeleton className="h-8 w-full lg:w-4/5" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
            <div className="space-y-4 pt-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>
            <div className="pt-6 flex flex-wrap gap-4">
              <Skeleton className="h-12 w-44" />
              <Skeleton className="h-12 w-44" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSkeleton;