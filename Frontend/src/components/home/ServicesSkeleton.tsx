import { Skeleton } from "@/components/ui/skeleton";

const ServicesSkeleton = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-100 to-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <Skeleton className="h-10 w-1/3 mx-auto mb-16 text-center" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white/90 p-6 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <Skeleton className="w-12 h-12 rounded-lg mt-1" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5 mt-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSkeleton;