import { Skeleton } from "@/components/ui/skeleton";

const HeroSkeleton = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 to-black z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-900/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-emerald-700/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <Skeleton className="w-48 h-4 rounded-md" />
            <Skeleton className="h-10 w-full md:w-3/4 lg:w-5/6" />
            <Skeleton className="h-6 w-full md:w-2/3" />
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-6 w-3/4" />
            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-10 h-10 rounded-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40 mt-2" />
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-emerald-900/20 rounded-2xl -z-10"></div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-1 border border-gray-700">
                <div className="bg-gray-800 rounded-xl p-8">
                  <Skeleton className="w-full h-80 md:h-96 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;