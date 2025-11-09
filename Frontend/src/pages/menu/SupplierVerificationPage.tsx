import React from 'react';
import { Button } from "@/components/ui/button";

const SupplierVerificationPage = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Supplier Verification</h1>
          <p className="text-lg text-muted-foreground">
            Thorough verification process to ensure your suppliers are legitimate and meet quality standards
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-md border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Verification Process</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Company Background Check</h3>
                <p className="text-muted-foreground">Verification of business registration, licenses, and legal standing.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Factory Inspection</h3>
                <p className="text-muted-foreground">On-site visit to verify manufacturing capabilities and quality processes.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Reference Verification</h3>
                <p className="text-muted-foreground">Checking with previous clients to verify reliability and performance.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Financial Stability Check</h3>
                <p className="text-muted-foreground">Assessment of the supplier's financial health and business stability.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Risk Reduction</h3>
            <p className="text-muted-foreground">Minimize risks of fraud and quality issues.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Quality Assurance</h3>
            <p className="text-muted-foreground">Ensure products meet your standards before production.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Business Security</h3>
            <p className="text-muted-foreground">Verify supplier legitimacy and compliance.</p>
          </div>
        </div>

        <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Protect Your Business with Verification</h2>
          <p className="text-muted-foreground mb-4">
            Our comprehensive verification process ensures you're partnering with legitimate suppliers 
            who meet your quality and delivery requirements, protecting your investment and reputation.
          </p>
          <Button variant="default">Start Verification Process</Button>
        </div>
      </div>
    </div>
  );
};

export default SupplierVerificationPage;