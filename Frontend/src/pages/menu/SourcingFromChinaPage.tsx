import React from 'react';
import { Button } from "@/components/ui/button";

const SourcingFromChinaPage = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Sourcing from China</h1>
          <p className="text-lg text-muted-foreground">
            Access to verified suppliers in China with competitive pricing and quality products
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-md border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Our China Sourcing Process</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Supplier Identification</h3>
                <p className="text-muted-foreground">We research and identify potential suppliers that meet your product requirements and quality standards.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Factory Audit</h3>
                <p className="text-muted-foreground">On-site verification of supplier facilities, capabilities, and quality control processes.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Sample Evaluation</h3>
                <p className="text-muted-foreground">Testing and verification of product samples to ensure they meet your specifications.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Negotiation & Orders</h3>
                <p className="text-muted-foreground">Negotiating best pricing and terms, then managing the order process from start to finish.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Cost Effective</h3>
            <p className="text-muted-foreground">Access to competitive pricing and manufacturing capabilities.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Quality Assurance</h3>
            <p className="text-muted-foreground">Rigorous quality control processes to ensure product standards.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Wide Selection</h3>
            <p className="text-muted-foreground">Access to a vast range of manufacturers and product categories.</p>
          </div>
        </div>

        <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Why Choose Our China Sourcing Services?</h2>
          <p className="text-muted-foreground mb-4">
            With years of experience and established relationships with trusted suppliers, we help you navigate 
            the complexities of sourcing from China while maintaining quality and cost efficiency.
          </p>
          <Button variant="default">Contact Us Today</Button>
        </div>
      </div>
    </div>
  );
};

export default SourcingFromChinaPage;