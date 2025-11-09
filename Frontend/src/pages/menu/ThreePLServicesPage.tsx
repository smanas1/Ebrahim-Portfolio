import React from 'react';
import { Button } from "@/components/ui/button";

const ThreePLServicesPage = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">3PL Services</h1>
          <p className="text-lg text-muted-foreground">
            Third-party logistics solutions for storage, picking, packing, and shipping
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-md border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">3PL Service Portfolio</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Warehousing</h3>
                <p className="text-muted-foreground">Secure storage facilities with inventory management systems.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Order Picking</h3>
                <p className="text-muted-foreground">Accurate picking services to fulfill customer orders.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Packing & Kitting</h3>
                <p className="text-muted-foreground">Professional packing and assembly of multi-item orders.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Shipping Management</h3>
                <p className="text-muted-foreground">Efficient shipping with multiple carrier options.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Scalability</h3>
            <p className="text-muted-foreground">Scale operations up or down based on demand.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Cost Efficiency</h3>
            <p className="text-muted-foreground">Reduce overhead costs compared to in-house logistics.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Focus</h3>
            <p className="text-muted-foreground">Concentrate on core business while logistics are handled.</p>
          </div>
        </div>

        <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Streamline Your Operations</h2>
          <p className="text-muted-foreground mb-4">
            Our 3PL services provide comprehensive logistics solutions, allowing you to scale 
            your business without the complexity and costs of managing your own fulfillment operations.
          </p>
          <Button variant="default">Explore 3PL Options</Button>
        </div>
      </div>
    </div>
  );
};

export default ThreePLServicesPage;