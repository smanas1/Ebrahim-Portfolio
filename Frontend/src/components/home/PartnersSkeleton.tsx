import { Skeleton } from "@/components/ui/skeleton";

const PartnersSkeleton = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Skeleton className="h-10 w-1/3 mx-auto mb-16 text-center" />
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="w-32 h-16 rounded-lg" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSkeleton;