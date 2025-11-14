import { Button } from "@/components/ui/button";
import { Ship, Plane, Truck, MapPin } from "lucide-react";

const LogisticsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg">
              <MapPin className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 mt-8">
            Logistics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive shipping solutions for your international trade needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-t-4 border-blue-500 transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Ship className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">Sea Freight</h2>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-700 dark:text-gray-300">Cost-effective for bulk cargo</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-700 dark:text-gray-300">International shipping routes</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-700 dark:text-gray-300">Container tracking services</span>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
              <p className="text-center text-blue-700 dark:text-blue-300 text-sm">
                Best for heavy or large shipments
              </p>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
              Get Sea Freight Quote
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-t-4 border-green-500 transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Plane className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">Air Freight</h2>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700 dark:text-gray-300">Fastest shipping option</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700 dark:text-gray-300">Global destination reach</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700 dark:text-gray-300">Priority handling guaranteed</span>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
              <p className="text-center text-green-700 dark:text-green-300 text-sm">
                Ideal for urgent shipments
              </p>
            </div>
            <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
              Request Air Freight
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-t-4 border-purple-500 transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Truck className="h-10 w-10 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">Express Courier</h2>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-gray-700 dark:text-gray-300">Door-to-door service</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-gray-700 dark:text-gray-300">Real-time tracking</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-gray-700 dark:text-gray-300">Fastest delivery times</span>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-6">
              <p className="text-center text-purple-700 dark:text-purple-300 text-sm">
                Perfect for documents and small packages
              </p>
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              Schedule Pickup
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Logistics Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold">$</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Competitive Rates</h3>
              <p className="text-gray-600 dark:text-gray-300">Best prices for your shipping needs</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/50 rounded-full mb-4">
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Real-Time Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">Monitor your shipment in real time</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl">
              <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full mb-4">
                <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Customs Expertise</h3>
              <p className="text-gray-600 dark:text-gray-300">Smooth customs clearance process</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-xl">
              <div className="inline-flex items-center justify-center p-3 bg-amber-100 dark:bg-amber-900/50 rounded-full mb-4">
                <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center">
                  <span className="text-white text-lg">⚙️</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Flexible Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300">Tailored shipping options for you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticsPage;