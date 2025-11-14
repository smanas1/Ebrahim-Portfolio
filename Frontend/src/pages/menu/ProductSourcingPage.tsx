import { Button } from "@/components/ui/button";
import { Package, CheckCircle, TrendingUp, Globe } from "lucide-react";

const ProductSourcingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6">
            <Package className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Product Sourcing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional sourcing services to help you find the right products
            from trusted suppliers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-emerald-100 dark:border-gray-700 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg mr-4">
                <Globe className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Sourcing from China
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              Access to verified suppliers in China with competitive pricing and
              quality products. We handle everything from factory audits to
              quality inspections.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  Verified supplier network
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  Competitive pricing
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  Quality assurance
                </span>
              </div>
            </div>
            <Button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg">
              Start Sourcing
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-emerald-100 dark:border-gray-700 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg mr-4">
                <CheckCircle className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Supplier Verification
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              Ensuring your suppliers meet quality standards and are legitimate.
              We perform thorough background checks and factory visits before
              you commit to any partnership.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-cyan-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  Factory audits
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-cyan-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  Background checks
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-cyan-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  Reference verification
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="mt-6 w-full py-3 text-lg border-2"
            >
              Verify Supplier
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">
            Why Choose Our Product Sourcing Services?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <TrendingUp className="h-12 w-12 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold">Cost Optimization</h3>
                  <p className="text-emerald-100">
                    Save up to 30% on product costs
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <CheckCircle className="h-12 w-12 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold">Quality Assurance</h3>
                  <p className="text-emerald-100">Zero tolerance for defects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSourcingPage;
