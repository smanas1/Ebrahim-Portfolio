import React from 'react';
import { Button } from "@/components/ui/button";

const PhotographyPage = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Photography</h1>
          <p className="text-lg text-muted-foreground">
            Professional photography services to showcase your products and brand
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card p-6 rounded-xl shadow-md border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-3">Product Photography</h2>
            <p className="text-muted-foreground mb-4">
              High-quality product images that highlight features, materials, and details. 
              Perfect for e-commerce listings and marketing materials.
            </p>
            <Button variant="outline">Learn More</Button>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-md border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-3">Lifestyle Photography</h2>
            <p className="text-muted-foreground mb-4">
              Lifestyle images showing products in use environments. Great for marketing 
              campaigns and creating emotional connections with customers.
            </p>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>

        <div className="bg-muted p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">Photography Benefits</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-center">
              <div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center mr-2">
                <span className="text-primary-foreground text-sm">✓</span>
              </div>
              <span>Professional quality images</span>
            </li>
            <li className="flex items-center">
              <div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center mr-2">
                <span className="text-primary-foreground text-sm">✓</span>
              </div>
              <span>Multiple shooting angles and setups</span>
            </li>
            <li className="flex items-center">
              <div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center mr-2">
                <span className="text-primary-foreground text-sm">✓</span>
              </div>
              <span>Fast turnaround time</span>
            </li>
            <li className="flex items-center">
              <div className="bg-primary w-6 h-6 rounded-full flex items-center justify-center mr-2">
                <span className="text-primary-foreground text-sm">✓</span>
              </div>
              <span>Enhanced visual appeal for products</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhotographyPage;