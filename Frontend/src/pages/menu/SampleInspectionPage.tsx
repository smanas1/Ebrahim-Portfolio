import React from 'react';
import { Button } from "@/components/ui/button";

const SampleInspectionPage = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Sample Inspection</h1>
          <p className="text-lg text-muted-foreground">
            Thorough evaluation of product samples to verify they meet your quality standards and specifications
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-md border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Inspection Process</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Specification Verification</h3>
                <p className="text-muted-foreground">Compare sample characteristics with your detailed specifications.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Physical Assessment</h3>
                <p className="text-muted-foreground">Evaluate size, weight, color, material quality, and construction.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Performance Testing</h3>
                <p className="text-muted-foreground">Test functionality, durability, and other performance aspects.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Compliance Check</h3>
                <p className="text-muted-foreground">Verify samples meet applicable safety and regulatory standards.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Quality Assurance</h3>
            <p className="text-muted-foreground">Verify samples meet quality standards before production.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Risk Reduction</h3>
            <p className="text-muted-foreground">Minimize risk of production of substandard products.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Design Verification</h3>
            <p className="text-muted-foreground">Confirm final product matches your design requirements.</p>
          </div>
        </div>

        <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ensure Sample Excellence</h2>
          <p className="text-muted-foreground mb-4">
            Our sample inspection service ensures that your product samples meet all specifications 
            and quality standards before you commit to a full production run.
          </p>
          <Button variant="default">Request Sample Inspection</Button>
        </div>
      </div>
    </div>
  );
};

export default SampleInspectionPage;