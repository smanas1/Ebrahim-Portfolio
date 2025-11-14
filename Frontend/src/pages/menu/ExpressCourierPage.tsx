import { Button } from "@/components/ui/button";

const ExpressCourierPage = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Express Courier</h1>
          <p className="text-lg text-muted-foreground">
            Door-to-door express shipping for small packages and documents
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-md border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Courier Services</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Same Day Delivery</h3>
                <p className="text-muted-foreground">Ultra-fast delivery within the same day in major cities.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Overnight Shipping</h3>
                <p className="text-muted-foreground">Next-day delivery for urgent small packages.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Two Day Shipping</h3>
                <p className="text-muted-foreground">Cost-effective express option for non-urgent items.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">International Express</h3>
                <p className="text-muted-foreground">Fast delivery to destinations worldwide with tracking.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Speed</h3>
            <p className="text-muted-foreground">Fastest delivery options available for urgent needs.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Reliability</h3>
            <p className="text-muted-foreground">Consistent delivery times and tracking capabilities.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Convenience</h3>
            <p className="text-muted-foreground">Door-to-door collection and delivery service.</p>
          </div>
        </div>

        <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Express Delivery Solution</h2>
          <p className="text-muted-foreground mb-4">
            Our express courier services provide the fastest and most reliable shipping solution 
            for small packages and documents with real-time tracking and delivery confirmation.
          </p>
          <Button variant="default">Get Express Quote</Button>
        </div>
      </div>
    </div>
  );
};

export default ExpressCourierPage;