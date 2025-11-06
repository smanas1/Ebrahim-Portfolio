import { Skeleton } from "@/components/ui/skeleton";

const TestimonialsSkeleton = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-100 to-emerald-50">
      <div className="container mx-auto px-4">
        <Skeleton className="h-10 w-1/3 mx-auto mb-12 text-center" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/90 p-6 rounded-2xl border border-gray-200 relative">
              <div className="absolute top-4 right-4">
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-4/5 mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <div className="flex items-center mt-6">
                <Skeleton className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24 mt-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSkeleton;