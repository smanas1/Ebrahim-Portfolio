import React from 'react';
import { Button } from "@/components/ui/button";

const AirFreightPage = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Air Freight</h1>
          <p className="text-lg text-muted-foreground">
            Faster shipping option for urgent, high-value, or lightweight shipments
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-md border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Air Freight Solutions</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Express Services</h3>
                <p className="text-muted-foreground">Next-day or two-day delivery options for urgent shipments.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Standard Air Freight</h3>
                <p className="text-muted-foreground">Balanced option for speed and cost-effectiveness.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Special Cargo Handling</h3>
                <p className="text-muted-foreground">Dedicated handling for fragile, valuable, or hazardous goods.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Customs Clearances</h3>
                <p className="text-muted-foreground">Efficient handling of all customs documentation and procedures.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Speed</h3>
            <p className="text-muted-foreground">Fastest shipping method for international deliveries.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Security</h3>
            <p className="text-muted-foreground">Safer handling and reduced risk of damage.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Tracking</h3>
            <p className="text-muted-foreground">Precise tracking capabilities throughout shipment.</p>
          </div>
        </div>

        <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Get Your Goods Fast</h2>
          <p className="text-muted-foreground mb-4">
            Our air freight services provide the fastest shipping solution for urgent shipments, 
            with reliable tracking and expedited customs clearance.
          </p>
          <Button variant="default">Request Air Freight Quote</Button>
        </div>
      </div>
    </div>
  );
};

export default AirFreightPage;