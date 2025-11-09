import React from 'react';
import { Button } from "@/components/ui/button";

const ProductPhotographyPage = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Product Photography</h1>
          <p className="text-lg text-muted-foreground">
            High-quality product images that highlight features, materials, and details
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-md border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Photography Services</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">E-commerce Photography</h3>
                <p className="text-muted-foreground">Professional images perfect for online marketplaces and websites.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">360-Degree Views</h3>
                <p className="text-muted-foreground">Comprehensive product visualization with multiple angles.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Detail Shots</h3>
                <p className="text-muted-foreground">Close-up images highlighting materials, textures, and features.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Lifestyle Context</h3>
                <p className="text-muted-foreground">Product images showing use in real-life scenarios.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Quality</h3>
            <p className="text-muted-foreground">High-resolution, professionally lit product images.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Consistency</h3>
            <p className="text-muted-foreground">Uniform style and lighting across all product photos.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Conversion</h3>
            <p className="text-muted-foreground">Images that increase customer confidence and sales.</p>
          </div>
        </div>

        <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Elevate Your Product Presentation</h2>
          <p className="text-muted-foreground mb-4">
            Our product photography services create compelling visual content that showcases 
            your products in the best light, increasing customer engagement and conversion rates.
          </p>
          <Button variant="default">Book Photography Session</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPhotographyPage;