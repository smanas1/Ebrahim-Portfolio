import { Button } from "@/components/ui/button";

const SeaFreightPage = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Sea Freight</h1>
          <p className="text-lg text-muted-foreground">
            Cost-effective shipping solution for large, heavy, or less time-sensitive cargo
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-md border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Sea Freight Services</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Full Container Load (FCL)</h3>
                <p className="text-muted-foreground">Dedicated container for large shipments with better security.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Less than Container Load (LCL)</h3>
                <p className="text-muted-foreground">Cost-effective option for smaller shipments sharing containers.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Port-to-Port Services</h3>
                <p className="text-muted-foreground">Transportation from origin to destination ports.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Door-to-Door Services</h3>
                <p className="text-muted-foreground">Complete service from origin to final destination.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Cost Effective</h3>
            <p className="text-muted-foreground">Most economical option for large and heavy shipments.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">High Capacity</h3>
            <p className="text-muted-foreground">Able to transport large volumes of goods.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">Reliability</h3>
            <p className="text-muted-foreground">Well-established shipping networks and routes.</p>
          </div>
        </div>

        <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Optimize Your Sea Freight</h2>
          <p className="text-muted-foreground mb-4">
            Our sea freight services provide cost-effective transportation solutions for large shipments, 
            with competitive rates and reliable delivery schedules.
          </p>
          <Button variant="default">Get Sea Freight Quote</Button>
        </div>
      </div>
    </div>
  );
};

export default SeaFreightPage;