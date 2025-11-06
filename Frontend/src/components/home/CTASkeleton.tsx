import { Skeleton } from "@/components/ui/skeleton";

const CTASkeleton = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-100 to-emerald-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Skeleton className="h-8 w-2/3 mx-auto mb-6" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
          <Skeleton className="h-12 w-44 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default CTASkeleton;