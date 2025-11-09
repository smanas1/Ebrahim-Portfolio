import React from 'react';
import { Button } from "@/components/ui/button";
import { Package, Warehouse, Truck, ShoppingCart } from "lucide-react";

const FulfillmentPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-full mb-6">
            <Package className="h-16 w-16 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-6">
            Fulfillment Solutions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            End-to-end fulfillment solutions to streamline your order processing and delivery
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="group">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-amber-100 dark:border-gray-700 transition-all duration-500 transform group-hover:scale-105">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Amazon FBA Prep</h2>
                  <ShoppingCart className="h-10 w-10" />
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
                  Complete preparation services for Amazon FBA shipments. We handle labeling, 
                  packaging, and prep requirements to ensure smooth Amazon integration.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4">
                      <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Professional Packaging</h3>
                      <p className="text-gray-600 dark:text-gray-400">Secure packaging that meets Amazon standards</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4">
                      <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Labeling Services</h3>
                      <p className="text-gray-600 dark:text-gray-400">Correct FNSKU labeling for seamless integration</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4">
                      <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Compliance Assurance</h3>
                      <p className="text-gray-600 dark:text-gray-400">Full compliance with Amazon fulfillment standards</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 mb-6">
                  <p className="text-center text-amber-800 dark:text-amber-200 font-medium">
                    Save time and focus on growing your business while we handle the prep work
                  </p>
                </div>
                
                <Button className="w-full h-14 text-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg">
                  Start Amazon Prep Services
                </Button>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-orange-100 dark:border-gray-700 transition-all duration-500 transform group-hover:scale-105">
              <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">3PL Services</h2>
                  <Warehouse className="h-10 w-10" />
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
                  Third-party logistics solutions for storage, picking, packing, and shipping. 
                  Scalable fulfillment services to grow with your business.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4">
                      <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Warehouse Storage</h3>
                      <p className="text-gray-600 dark:text-gray-400">Secure and climate-controlled storage facilities</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4">
                      <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Order Processing</h3>
                      <p className="text-gray-600 dark:text-gray-400">Fast and accurate picking, packing, and shipping</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4">
                      <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Inventory Management</h3>
                      <p className="text-gray-600 dark:text-gray-400">Real-time inventory tracking and analytics</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 mb-6">
                  <p className="text-center text-orange-800 dark:text-orange-200 font-medium">
                    Scale your operations without the complexity of managing fulfillment
                  </p>
                </div>
                
                <Button variant="outline" className="w-full h-14 text-lg border-2 border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30">
                  Explore 3PL Options
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-8">Key Fulfillment Advantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Focus on Growth</h3>
              <p className="text-gray-300">Concentrate on your business while we handle logistics</p>
            </div>
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Cost Efficiency</h3>
              <p className="text-gray-300">Reduce operational expenses and shipping costs</p>
            </div>
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2">Scalability</h3>
              <p className="text-gray-300">Easily scale operations up or down as needed</p>
            </div>
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-2">Expert Management</h3>
              <p className="text-gray-300">Professional handling with industry expertise</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FulfillmentPage;