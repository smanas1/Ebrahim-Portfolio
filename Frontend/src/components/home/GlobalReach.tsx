import { WorldMapRich } from "./WorldMapRich";

const GlobalReach = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 relative">
            <div className="relative w-full h-[400px]">
              <WorldMapRich />
            </div>
          </div>
          <div className="lg:w-1/2 space-y-8">
            <span className="inline-block px-4 py-1 text-xs font-semibold bg-emerald-600 text-white rounded-full uppercase tracking-wider mb-4">
              OUR ACHIEVEMENTS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Serving Globally
            </h2>
            <p className="text-lg text-gray-600">
              With 8+ years of experience in international trade, I understand
              the intricacies of global logistics. From sourcing in China to
              delivery in the US, UK, Canada, and beyond — I make freight run
              like clockwork for my clients.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {[
                { value: "5,000+", label: "Projects Delivered" },
                { value: "$5M", label: "Orders Processed" },
                { value: "$2K+", label: "Saved For Each Client" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-emerald-50 transition-colors"
                >
                  <div className="text-3xl md:text-4xl font-bold text-emerald-600">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalReach;
