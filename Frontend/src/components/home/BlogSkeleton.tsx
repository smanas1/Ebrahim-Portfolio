import { Skeleton } from "@/components/ui/skeleton";

const BlogSkeleton = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <Skeleton className="h-10 w-1/4 mx-auto mb-12 text-center" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50">
              <Skeleton className="w-full h-48" />
              <div className="p-6">
                <Skeleton className="h-5 w-1/4 mb-3" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-4/5 mb-4" />
                <div className="flex items-center">
                  <Skeleton className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-20 mt-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSkeleton;