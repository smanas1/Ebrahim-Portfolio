import { Button } from "@/components/ui/button";

const AmazonFBAPrepPage = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Amazon FBA Prep</h1>
          <p className="text-lg text-muted-foreground">
            Complete preparation services for Amazon FBA shipments
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-md border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">FBA Preparation Services</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Product Labeling</h3>
                <p className="text-muted-foreground">Applying correct FNSKU labels as per Amazon requirements.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Product Packaging</h3>
                <p className="text-muted-foreground">Secure packaging to meet Amazon's standards and avoid damage.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Polybagging</h3>
                <p className="text-muted-foreground">Adding protective polybags for clothing and other items.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Fulfillment Documentation</h3>
                <p className="text-muted-foreground">Preparing all required shipping cartons and documentation.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Compliance</h3>
            <p className="text-muted-foreground">Ensuring all prep meets Amazon's requirements.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Time Saving</h3>
            <p className="text-muted-foreground">Focus on your business while we handle prep work.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Quality</h3>
            <p className="text-muted-foreground">Professional handling to prevent damage and rejections.</p>
          </div>
        </div>

        <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Optimize Your FBA Experience</h2>
          <p className="text-muted-foreground mb-4">
            Our Amazon FBA prep services ensure your products meet all Amazon requirements, 
            helping you avoid fees, delays, and rejections while saving time on prep work.
          </p>
          <Button variant="default">Start FBA Prep</Button>
        </div>
      </div>
    </div>
  );
};

export default AmazonFBAPrepPage;