import React from 'react';
import { Button } from "@/components/ui/button";

const PreProductionInspectionPage = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Pre-Production Inspection</h1>
          <p className="text-lg text-muted-foreground">
            Verify that production materials and initial samples meet your specifications before mass production
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-md border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Inspection Process</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Material Verification</h3>
                <p className="text-muted-foreground">Checking that raw materials and components match your specifications.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Sample Analysis</h3>
                <p className="text-muted-foreground">Examining initial samples for quality, size, color, and functionality.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Production Setup Review</h3>
                <p className="text-muted-foreground">Confirming that manufacturing processes align with your requirements.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Documentation Check</h3>
                <p className="text-muted-foreground">Verifying compliance with specifications, standards, and regulations.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Early Detection</h3>
            <p className="text-muted-foreground">Identify issues before mass production begins.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Cost Savings</h3>
            <p className="text-muted-foreground">Avoid costly mistakes and rework later in the process.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Quality Assurance</h3>
            <p className="text-muted-foreground">Ensure products meet your quality standards from the start.</p>
          </div>
        </div>

        <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Secure Your Production Quality</h2>
          <p className="text-muted-foreground mb-4">
            Our pre-production inspection service catches potential issues early, ensuring your products 
            meet quality standards from the very beginning of manufacturing.
          </p>
          <Button variant="default">Schedule Inspection</Button>
        </div>
      </div>
    </div>
  );
};

export default PreProductionInspectionPage;