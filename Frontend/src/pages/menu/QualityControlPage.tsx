import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Check, AlertTriangle, Target } from "lucide-react";

const QualityControlPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-5 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
            <Shield className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Quality Control
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive inspection services to ensure your products meet quality standards
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border-l-4 border-red-500 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-6">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg mr-4">
                <Target className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pre-Production Inspection</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Verify that production materials and initial samples meet your specifications 
                  before mass production begins. Critical for catching issues early.
                </p>
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-4">
              <p className="text-red-700 dark:text-red-300 text-sm">
                <AlertTriangle className="inline h-4 w-4 mr-1" />
                Prevent costly mistakes before production starts
              </p>
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              Schedule Inspection
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border-l-4 border-blue-500 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                <Check className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">During Production Inspection</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Monitor production progress to ensure quality standards are maintained throughout 
                  the manufacturing process. Includes spot checks and random sampling.
                </p>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                <Check className="inline h-4 w-4 mr-1" />
                Maintain consistent quality during manufacturing
              </p>
            </div>
            <Button variant="outline" className="w-full border-blue-500 text-blue-600 dark:text-blue-400">
              Learn More
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border-l-4 border-green-500 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pre-Shipment Inspection</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Final quality check before products are shipped to catch any defects or issues. 
                  Includes verification of quantity, packaging, and appearance.
                </p>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
              <p className="text-green-700 dark:text-green-300 text-sm">
                <Check className="inline h-4 w-4 mr-1" />
                Ensure perfect condition before shipping
              </p>
            </div>
            <Button variant="outline" className="w-full border-green-500 text-green-600 dark:text-green-400">
              Book Inspection
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border-l-4 border-purple-500 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-4">
                <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sample Inspection</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Thorough evaluation of product samples to verify they meet your quality standards 
                  and specifications. Perfect for new product development.
                </p>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-4">
              <p className="text-purple-700 dark:text-purple-300 text-sm">
                <Target className="inline h-4 w-4 mr-1" />
                Verify specifications before full production
              </p>
            </div>
            <Button variant="outline" className="w-full border-purple-500 text-purple-600 dark:text-purple-400">
              Request Sample Check
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">Quality Control Advantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center p-4 bg-gray-700/50 rounded-lg">
              <div className="p-2 bg-red-500 rounded-lg mr-4">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Risk Reduction</h3>
                <p className="text-gray-300">Reduce risk of defective products reaching customers</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-700/50 rounded-lg">
              <div className="p-2 bg-blue-500 rounded-lg mr-4">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Compliance</h3>
                <p className="text-gray-300">Ensure compliance with regulations and standards</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-700/50 rounded-lg">
              <div className="p-2 bg-green-500 rounded-lg mr-4">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Brand Protection</h3>
                <p className="text-gray-300">Protect your brand reputation with consistent quality</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-700/50 rounded-lg">
              <div className="p-2 bg-purple-500 rounded-lg mr-4">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Cost Saving</h3>
                <p className="text-gray-300">Save money by catching issues early in production</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityControlPage;