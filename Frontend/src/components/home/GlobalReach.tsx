const GlobalReach = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 relative">
            <div className="relative w-full h-[400px]">
              <svg
                viewBox="0 0 800 400"
                className="w-full h-full fill-emerald-100 stroke-emerald-300 stroke-[0.5]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M100,50 L150,30 L200,60 L180,100 L120,90 Z" />
                <path d="M150,120 L180,150 L160,180 L130,170 Z" />
                <path d="M300,80 L330,60 L350,90 L320,110 Z" />
                <path d="M320,120 L350,140 L330,170 L300,150 Z" />
                <path d="M400,70 L450,50 L500,80 L480,120 L420,110 Z" />
                <path d="M550,200 L580,210 L570,230 L540,220 Z" />
                {Array.from({ length: 120 }).map((_, i) => (
                  <circle
                    key={i}
                    cx={Math.random() * 700 + 50}
                    cy={Math.random() * 300 + 50}
                    r="1"
                    className="fill-emerald-400 opacity-30"
                  />
                ))}
              </svg>
              <div className="absolute top-[15%] left-[25%] w-6 h-6 bg-emerald-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              <div className="absolute top-[30%] left-[15%] w-6 h-6 bg-emerald-600 rounded-full border-2 border-white shadow-lg animate-pulse delay-1000"></div>
              <div className="absolute top-[40%] left-[40%] w-6 h-6 bg-emerald-600 rounded-full border-2 border-white shadow-lg animate-pulse delay-2000"></div>
              <div className="absolute top-[50%] left-[60%] w-6 h-6 bg-emerald-600 rounded-full border-2 border-white shadow-lg animate-pulse delay-3000"></div>
              <div className="absolute top-[60%] left-[75%] w-6 h-6 bg-emerald-600 rounded-full border-2 border-white shadow-lg animate-pulse delay-4000"></div>
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
