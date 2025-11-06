import { WorldMapRich } from "./WorldMapRich";
import { useTheme } from "@/context/ThemeContext";

const GlobalReach = () => {
  const { theme } = useTheme();

  return (
    <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 relative">
            <div className="relative w-full h-[400px]">
              <WorldMapRich />
            </div>
          </div>
          <div className="lg:w-1/2 space-y-8">
            <span className={`inline-block px-4 py-1 text-xs font-semibold ${theme === 'dark' ? 'bg-emerald-600 text-white' : 'bg-emerald-600 text-white'} rounded-full uppercase tracking-wider mb-4`}>
              OUR ACHIEVEMENTS
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Serving Globally
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
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
                  className={`text-center p-4 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:bg-emerald-900/20' : 'bg-gray-50 border-gray-200 hover:bg-emerald-50'} rounded-xl border transition-colors`}
                >
                  <div className={`text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{stat.label}</div>
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
