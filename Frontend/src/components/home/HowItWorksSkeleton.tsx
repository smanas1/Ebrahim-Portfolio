import { Skeleton } from "@/components/ui/skeleton";

const HowItWorksSkeleton = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <Skeleton className="h-10 w-1/2 mx-auto mb-16 text-center" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-gray-700/50">
              <div className="flex flex-col items-center text-center">
                <Skeleton className="w-16 h-16 rounded-full mb-6" />
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSkeleton;