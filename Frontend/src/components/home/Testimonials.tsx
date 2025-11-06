import { useTheme } from "@/context/ThemeContext";

const Testimonials = () => {
  const { theme } = useTheme();

  return (
    <section className={`py-16 ${theme === 'dark' ? 'bg-gradient-to-r from-gray-900 to-gray-800' : 'bg-gradient-to-r from-gray-100 to-emerald-50'} text-gray-900`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h2 className={`text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              What My Clients Say
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              We used to juggle 4 different freight vendors. Ebrahim took over
              everything — sourcing, shipping, compliance — and saved us over
              <span className={theme === 'dark' ? 'font-bold text-emerald-400' : 'font-bold text-emerald-600'}>£11,000</span> in the
              first quarter alone.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
                alt="James R."
                className="w-12 h-12 rounded-full border-2 border-emerald-500"
              />
              <div>
                <div className={theme === 'dark' ? 'font-bold text-white' : 'font-bold text-gray-900'}>James R.</div>
                <div className={theme === 'dark' ? 'text-sm text-gray-400' : 'text-sm text-gray-600'}>
                  Logistics Manager, Midlands-Based Retail Chain
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80"
                alt="Team reviewing logistics dashboard"
                className="rounded-xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
        <div className={`mt-16 ${theme === 'dark' ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-gray-100 to-gray-200'} rounded-xl p-6`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className={theme === 'dark' ? 'text-white font-medium' : 'text-gray-800 font-medium'}>Trusted by:</div>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {[
                {
                  name: "Amazon",
                  logoUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
                },
                {
                  name: "Shopify",
                  logoUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
                },
                {
                  name: "Netflix",
                  logoUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png",
                },
                {
                  name: "Etsy",
                  logoUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/8/89/Etsy_logo.svg",
                },
              ].map((partner, i) => (
                <img
                  key={i}
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="h-8 w-auto  hover:grayscale-0 transition-all duration-300  hover:opacity-100"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;