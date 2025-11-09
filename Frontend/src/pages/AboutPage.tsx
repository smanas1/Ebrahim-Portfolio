import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  User,
  Globe,
  Truck,
  Camera,
  Package,
  Shield,
  Target,
  MessageSquare,
  Send,
  CheckCircle,
} from "lucide-react";
import { World } from "@/components/ui/globe";
import { useTheme } from "@/context/ThemeContext";

const AboutPage = () => {
  const { theme } = useTheme();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: -34.6037,
      startLng: -58.3816,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 14.5995,
      startLng: 120.9842,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: -15.432563,
      startLng: 28.315853,
      endLat: 1.094136,
      endLng: -63.34546,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: 37.5665,
      startLng: 126.978,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: 48.8566,
      startLng: -2.3522,
      endLat: 52.52,
      endLng: 13.405,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: -8.833221,
      startLng: 13.264837,
      endLat: -33.936138,
      endLng: 18.436529,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: 49.2827,
      startLng: -123.1207,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: 41.9028,
      startLng: 12.4964,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 1.3521,
      endLng: 103.8198,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 14,
      startLat: -33.936138,
      startLng: 18.436529,
      endLat: 21.395643,
      endLng: 39.883798,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },

    // === BANGLADESH ARCS (NEW) ===
    {
      order: 15,
      startLat: 23.685, // Bangladesh
      startLng: 90.3563,
      endLat: 51.5072, // London
      endLng: -0.1276,
      arcAlt: 0.4,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 15,
      startLat: 23.685, // Bangladesh
      startLng: 90.3563,
      endLat: 40.7128, // New York
      endLng: -74.006,
      arcAlt: 0.6,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 15,
      startLat: 23.685, // Bangladesh
      startLng: 90.3563,
      endLat: 31.2304, // Shanghai
      endLng: 121.4737,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 15,
      startLat: 23.685, // Bangladesh
      startLng: 90.3563,
      endLat: 25.276987, // Dubai
      endLng: 55.296249,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
  ];
  const services = [
    {
      name: "Product Sourcing",
      icon: <Target />,
      desc: "Ethical, cost-effective supplier matching",
    },
    {
      name: "Quality Control",
      icon: <Shield />,
      desc: "Rigorous pre-shipment inspections",
    },
    {
      name: "Freight Forwarding",
      icon: <Truck />,
      desc: "Door-to-door global logistics",
    },
    {
      name: "Product Photography",
      icon: <Camera />,
      desc: "E-commerce-ready visuals",
    },
    {
      name: "Sample Management",
      icon: <Package />,
      desc: "Consolidation & evaluation",
    },
    {
      name: "End-to-End Fulfillment",
      icon: <Globe />,
      desc: "From factory to customer",
    },
  ];

  const achievements = [
    { value: "50+", label: "Global Clients" },
    { value: "8+", label: "Years Experience" },
    { value: "100%", label: "On-Time Delivery" },
    { value: "200+", label: "Products Sourced" },
  ];

  const testimonials = [
    {
      name: "Sarah T.",
      role: "Amazon FBA Seller, USA",
      text: "Ebrahim saved my business during a supplier crisis. His QC caught a defect before shipment — that alone saved me $15K in returns.",
    },
    {
      name: "James L.",
      role: "E-commerce Brand Owner, UK",
      text: "From sourcing to delivery, everything was seamless. He’s now my go-to logistics partner for all product lines.",
    },
    {
      name: "Aisha R.",
      role: "Startup Founder, UAE",
      text: "As a first-time importer, I was lost. Ebrahim guided me step-by-step with patience and expertise.",
    },
  ];

  // Countries where you've served clients (for map visualization)
  const globalPresence = [
    { country: "USA", clients: 18 },
    { country: "UK", clients: 9 },
    { country: "Germany", clients: 7 },
    { country: "Australia", clients: 5 },
    { country: "UAE", clients: 4 },
    { country: "Canada", clients: 3 },
    { country: "France", clients: 2 },
    { country: "Singapore", clients: 2 },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      {/* 1. Hero */}
      <section className={`relative h-[70vh] ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-green-900 to-red-800'} text-white overflow-hidden`}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-15"></div>
        <div className="relative container mx-auto px-6 flex flex-col justify-center h-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium">
              Sourcing & Logistics Expert
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hi, I'm{" "}
              <span className="text-green-300">Ebrahim Mohammad Kamal</span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl opacity-90">
              I help global e-commerce brands source smarter, ship faster, and
              scale with confidence — from Dhaka to the world.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`mt-4 inline-flex items-center gap-2 ${theme === 'dark' ? 'bg-white text-red-700' : 'bg-white text-red-700'} font-semibold px-6 py-3 rounded-lg`}
            >
              Let's Work Together
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 2. Personal Journey */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <span className={`inline-block ${theme === 'dark' ? 'bg-emerald-900 text-emerald-100' : 'bg-green-100 text-green-800'} text-xs font-semibold px-3 py-1 rounded-full mb-3`}>
                  MY JOURNEY
                </span>
                <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  From Frustration to Trusted Partner
                </h2>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                Over 8 years ago, I faced the same sourcing nightmares many of
                you do today: delayed shipments, hidden defects, unreliable
                suppliers, and communication breakdowns across time zones.
              </p>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                That frustration became my mission. Today, I’ve partnered with
                50+ global clients — from Amazon FBA sellers to enterprise
                brands — to build transparent, resilient supply chains that just{" "}
                <em>work</em>.
              </p>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed font-medium`}>
                I don’t just manage logistics. I protect your reputation, your
                margins, and your peace of mind.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} p-1 rounded-2xl shadow-xl`}>
                <img
                  src="https://res.cloudinary.com/dtyqscfja/image/upload/v1761153174/Ebrahim/IMG_9764_fmyyuo.jpg"
                  alt="Ebrahim Mohammad Kamal"
                  className="w-full rounded-2xl object-cover aspect-square"
                />
              </div>
              <div className={`absolute -bottom-6 -right-6 bg-red-600 ${theme === 'dark' ? 'text-white' : 'text-white'} px-5 py-3 rounded-lg shadow-lg`}>
                <div className="font-bold text-lg">8+ Years</div>
                <div className="text-sm opacity-90">
                  In Sourcing & Logistics
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Global Impact with Dark Background */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="inline-block bg-red-500/20 text-red-300 text-xs font-semibold px-3 py-1 rounded-full mb-2 sm:mb-3 border border-red-500/30">
              GLOBAL IMPACT
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Serving Clients Across Continents
            </h2>
            <p className="text-gray-300 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              From North America to Europe, the Middle East to Oceania — I’ve
              helped brands navigate global supply chains with precision.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-4xl mx-auto">
              {/* Globe Container with responsive height */}
              <div className="relative after:absolute after:inset-0 after:rounded-2xl after:shadow-[0_0_40px_rgba(0,255,128,0.3)] after:z-[-1]">
                <div className="h-[400px] sm:h-[500px] md:h-[600px]">
                  <World data={sampleArcs} globeConfig={globeConfig} />
                </div>
              </div>

              {/* Client Country Tags — responsive grid */}
              <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {globalPresence.slice(0, 4).map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-200 truncate">
                      {item.country}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className={`inline-block ${theme === 'dark' ? 'bg-emerald-900 text-emerald-100' : 'bg-green-100 text-green-800'} text-xs font-semibold px-3 py-1 rounded-full mb-3`}>
              MY EXPERTISE
            </span>
            <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              End-to-End Supply Chain Solutions
            </h2>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-4 max-w-2xl mx-auto`}>
              I offer hands-on, white-glove support at every stage — because
              your success depends on details.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group p-6 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} rounded-2xl border hover:border-green-400 transition-all shadow-sm hover:shadow-md`}
              >
                <div className={`w-12 h-12 rounded-xl ${theme === 'dark' ? 'bg-emerald-900/20 text-emerald-400' : 'bg-green-50 text-green-600'} flex items-center justify-center mb-4 group-hover:${theme === 'dark' ? 'bg-emerald-800' : 'bg-green-100'} transition-colors`}>
                  {service.icon}
                </div>
                <h3 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {service.name}
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Stats & Achievements */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-green-50 to-red-50'}`}>
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {achievements.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-6"
              >
                <div className={`text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-1`}>
                  {stat.value}
                </div>
                <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <span className={`inline-block ${theme === 'dark' ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-800'} text-xs font-semibold px-3 py-1 rounded-full mb-3`}>
              CLIENT LOVE
            </span>
            <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Trusted by Global Brands
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} p-6 rounded-2xl`}
              >
                <div className="text-yellow-400 mb-3">★★★★★</div>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm mb-4 italic`}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-green-100 text-green-600'} flex items-center justify-center`}>
                    <User className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-green-600'}`} />
                  </div>
                  <div>
                    <div className={`${theme === 'dark' ? 'font-medium text-white' : 'font-medium text-gray-900'}`}>{t.name}</div>
                    <div className={`${theme === 'dark' ? 'text-xs text-gray-400' : 'text-xs text-gray-500'}`}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA + Contact */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-900'} text-white`}>
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Simplify Your Supply Chain?
          </h2>
          <p className="text-gray-300 mb-8">
            Let’s connect. I respond personally to every inquiry within 24
            hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:thisisebrahim@gmail.com"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Mail className="w-5 h-5" />
              Email Me
            </a>
            <a
              href="tel:+8801750062927"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
          <div className="mt-8 flex justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Rajshahi, Bangladesh
            </div>
          </div>
        </div>
      </section>

      {/* Floating Chat */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`mb-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-2xl shadow-xl p-4 w-80`}
            >
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-sm'}`}>
                Hi! I’m Ebrahim. Leave your email or WhatsApp, and I’ll get back
                to you shortly.
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Your email or number"
                  className={`flex-1 text-sm px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'border'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                <button className={`${theme === 'dark' ? 'bg-emerald-600 text-white' : 'bg-green-600 text-white'} p-2 rounded-lg`}>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`${theme === 'dark' ? 'bg-emerald-600 text-white' : 'bg-green-600 text-white'} p-4 rounded-full shadow-lg`}
        >
          <MessageSquare className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
};

export default AboutPage;
