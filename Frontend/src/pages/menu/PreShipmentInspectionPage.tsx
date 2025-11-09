import React from 'react';
import { Button } from "@/components/ui/button";

const PreShipmentInspectionPage = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Pre-Shipment Inspection</h1>
          <p className="text-lg text-muted-foreground">
            Final quality check before products are shipped to catch any defects or issues
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-md border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Inspection Protocol</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Quantity Verification</h3>
                <p className="text-muted-foreground">Confirm the correct number of units are being shipped.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Quality Assessment</h3>
                <p className="text-muted-foreground">Inspect random samples for defects and quality standards.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Packaging Review</h3>
                <p className="text-muted-foreground">Ensure packaging meets shipping and safety requirements.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Documentation Check</h3>
                <p className="text-muted-foreground">Verify shipping documents are complete and accurate.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Defect Prevention</h3>
            <p className="text-muted-foreground">Catch quality issues before shipment leaves factory.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Shipping Assurance</h3>
            <p className="text-muted-foreground">Ensure proper packaging and handling for safe transport.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Order Accuracy</h3>
            <p className="text-muted-foreground">Verify correct items and quantities are shipped.</p>
          </div>
        </div>

        <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Secure Your Shipment Quality</h2>
          <p className="text-muted-foreground mb-4">
            Our pre-shipment inspection service ensures your products meet quality standards 
            and are properly packaged before they leave the factory.
          </p>
          <Button variant="default">Schedule Inspection</Button>
        </div>
      </div>
    </div>
  );
};

export default PreShipmentInspectionPage;