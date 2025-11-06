import { useTheme } from "@/context/ThemeContext";

const Partners = () => {
  const { theme } = useTheme();

  return (
    <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} border-t border-b`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div>
            <span className={`inline-block px-4 py-1 text-xs font-semibold ${theme === 'dark' ? 'bg-emerald-900/30 text-emerald-300' : 'bg-emerald-100 text-emerald-700'} rounded-full uppercase tracking-wider mb-4`}>
              PARTNERSHIPS
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Trusted By & Collaborating With
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-4 max-w-2xl`}>
              I leverage my expertise and global network to deliver seamless
              logistics solutions — made possible through trusted relationships
              with leading platforms and service providers.
            </p>
          </div>
          <div className={`md:w-1/3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm leading-relaxed`}>
            I use my experience and global reach to drive economic prosperity
            for my clients — and I'm proud of the impact we've created together
            through long-term collaborations.
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {[
            {
              name: "Amazon",
              logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
            },
            {
              name: "Alibaba",
              logoUrl:
                "https://cdn.worldvectorlogo.com/logos/brandbird-alibaba-logotype.svg",
            },
            {
              name: "DHL",
              logoUrl: "https://cdn.worldvectorlogo.com/logos/dhl-1.svg",
            },
            {
              name: "FedEx",
              logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/FedEx_Express.svg/373px-FedEx_Express.svg.png?20250905034300",
            },
            {
              name: "UPS",
              logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/United_Parcel_Service_logo_2014.svg/800px-United_Parcel_Service_logo_2014.svg.png",
            },
            {
              name: "Shopify",
              logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
            },
            {
              name: "Walmart",
              logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Walmart_logo_%282008%29.svg/960px-Walmart_logo_%282008%29.svg.png?20250802041146",
            },
            {
              name: "Etsy",
              logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/8/89/Etsy_logo.svg",
            },
          ].map((partner, i) => (
            <div
              key={i}
              className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            >
              <img
                src={partner.logoUrl}
                alt={partner.name}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            *Logos shown are for illustrative purposes. Ebrahim Kamal partners
            with these platforms to serve his clients globally.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Partners;