import React from 'react';
import { Button } from "@/components/ui/button";

const LifestylePhotographyPage = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Lifestyle Photography</h1>
          <p className="text-lg text-muted-foreground">
            Lifestyle images showing products in use environments
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-md border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Lifestyle Photography Services</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Brand Storytelling</h3>
                <p className="text-muted-foreground">Create compelling narratives that connect with your target audience.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Product in Context</h3>
                <p className="text-muted-foreground">Show products being used in real-world scenarios and environments.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Model Photography</h3>
                <p className="text-muted-foreground">Professional models showcasing products in lifestyle situations.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Brand Identity</h3>
                <p className="text-muted-foreground">Create visual content that reflects your brand personality.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Emotional Connection</h3>
            <p className="text-muted-foreground">Create emotional bonds between customers and products.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Brand Appeal</h3>
            <p className="text-muted-foreground">Enhance brand perception and market positioning.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Market Impact</h3>
            <p className="text-muted-foreground">Increase engagement and marketing campaign effectiveness.</p>
          </div>
        </div>

        <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Bring Your Brand to Life</h2>
          <p className="text-muted-foreground mb-4">
            Our lifestyle photography services create authentic visual content that connects with 
            your audience and showcases your products in meaningful, relatable contexts.
          </p>
          <Button variant="default">Start Lifestyle Shoot</Button>
        </div>
      </div>
    </div>
  );
};

export default LifestylePhotographyPage;